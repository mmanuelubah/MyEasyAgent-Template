/**
 * useBookingStore — Shared mock store for booking codes.
 *
 * Rules:
 * 1. Each booking gets a unique code generated at booking-time.
 * 2. Codes expire the moment `inspectionAt` timestamp passes.
 * 3. A code can only be verified once — it's permanently marked `used` after that.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type BookingStatus = 'Scheduled' | 'Locked' | 'Completed' | 'AgentCancelled' | 'ClientCancelled' | 'Expired';

export interface Booking {
    id: string;          // MEA-XXXX
    code: string;        // unique inspection code: MEA-XXXX (same as id for simplicity, can differ)
    client: string;
    property: string;
    propertyId: string | number;
    agentName: string;
    /** ISO string for the inspection date+time */
    inspectionAt: string;
    status: BookingStatus;
    codeUsed: boolean;   // once true, code can never be verified again
    amount: number;      // ₦2,500 commitment fee
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'MEA-';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

function isExpired(inspectionAt: string): boolean {
    return new Date() > new Date(inspectionAt);
}

function isLocked(inspectionAt: string): boolean {
    const diffMs = new Date(inspectionAt).getTime() - Date.now();
    return diffMs > 0 && diffMs <= 24 * 60 * 60 * 1000; // within 24h
}

// ─── Module-level shared store (simulates a DB for this session) ──────────────
// This lives outside React so both client and agent views share the same data.

let _bookings: Booking[] = [
    {
        id: 'MEA-A1B2',
        code: 'MEA-A1B2',
        client: 'Alex Rivera',
        property: 'Admiralty Way Apartment',
        propertyId: 'prop-1',
        agentName: 'Oluwaseun Adeyemi',
        // 72h in the future
        inspectionAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        status: 'Scheduled',
        codeUsed: false,
        amount: 2500,
    },
    {
        id: 'MEA-C3D4',
        code: 'MEA-C3D4',
        client: 'David Moss',
        property: 'Lekki Phase 1 Duplex',
        propertyId: 'prop-2',
        agentName: 'Chioma Nwosu',
        // 6h in the future (locked)
        inspectionAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        status: 'Locked',
        codeUsed: false,
        amount: 2500,
    },
    {
        id: 'MEA-E5F6',
        code: 'MEA-E5F6',
        client: 'Sarah Chen',
        property: 'Victoria Island Penthouse',
        propertyId: 'prop-3',
        agentName: 'Fatima Al-Hassan',
        // Past — expired
        inspectionAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'Completed',
        codeUsed: true,
        amount: 2500,
    },
    {
        id: 'MEA-G7H8',
        code: 'MEA-G7H8',
        client: 'Alex Rivera',
        property: 'Lekki Phase 1 Duplex',
        propertyId: 'prop-2',
        agentName: 'Ade Williams',
        // Agent cancelled
        inspectionAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: 'AgentCancelled',
        codeUsed: false,
        amount: 2500,
    },
];

let _listeners: (() => void)[] = [];

function notify() {
    _listeners.forEach(fn => fn());
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const bookingStore = {
    /** Subscribe to changes (React useState pattern) */
    subscribe(fn: () => void): () => void {
        _listeners.push(fn);
        return () => { _listeners = _listeners.filter(l => l !== fn); };
    },

    getAll(): Booking[] {
        return _bookings;
    },

    getByCode(code: string): Booking | undefined {
        return _bookings.find(b => b.code === code.toUpperCase());
    },

    /** Add a new booking with a freshly generated unique code */
    createBooking(params: Omit<Booking, 'id' | 'code' | 'status' | 'codeUsed'>): Booking {
        const code = generateCode();
        const booking: Booking = {
            ...params,
            id: code,
            code,
            status: 'Scheduled',
            codeUsed: false,
        };
        _bookings = [booking, ..._bookings];
        notify();
        return booking;
    },

    /**
     * Verify a code:
     * - Invalid if code doesn't exist
     * - Invalid if already used
     * - Invalid if inspection time has passed (expired)
     * - Valid otherwise — marks as used + Completed immediately
     */
    verifyCode(code: string): { ok: boolean; reason?: string; booking?: Booking } {
        const upperCode = code.toUpperCase();
        const booking = _bookings.find(b => b.code === upperCode);

        if (!booking) {
            return { ok: false, reason: 'Code not found. Not a valid booking code.' };
        }
        if (booking.codeUsed) {
            return { ok: false, reason: 'Code already used. This inspection was already certified.' };
        }
        if (isExpired(booking.inspectionAt) && booking.status !== 'Locked') {
            return { ok: false, reason: 'Code expired. The inspection window has closed.' };
        }
        if (booking.status === 'AgentCancelled' || booking.status === 'ClientCancelled') {
            return { ok: false, reason: 'Booking is cancelled. Cannot verify a cancelled inspection.' };
        }

        // Mark used + completed
        _bookings = _bookings.map(b =>
            b.code === upperCode ? { ...b, codeUsed: true, status: 'Completed' } : b
        );
        notify();
        return { ok: true, booking: _bookings.find(b => b.code === upperCode) };
    },

    cancelBooking(id: string, by: 'client' | 'agent') {
        _bookings = _bookings.map(b =>
            b.id === id ? { ...b, status: by === 'client' ? 'ClientCancelled' : 'AgentCancelled' } : b
        );
        notify();
    },

    /** Helpers exposed for UI */
    isExpired,
    isLocked,
};
