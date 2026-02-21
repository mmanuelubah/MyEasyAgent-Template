# System Logic Specification: Inspection Payments & Cancellations

This document defines the official rules for handling client no-shows, cancellations, refunds, agent payments, platform fees, booking time states, and abuse prevention. All system behavior must follow this specification exactly.

---

## 1. Inspection Commitment Fee Structure
### Total Fee Per Inspection
Each client pays: **₦2,500 per confirmed booking**

### Breakdown
| Recipient | Amount |
| :--- | :--- |
| Agent | ₦2,000 |
| Platform | ₦500 |

### Important Rule
Funds are **not distributed immediately**. Distribution only happens after:
- Inspection completion, OR
- Client no-show, OR
- Late cancellation (after lock period)

No early allocation is allowed.

---

## 2. Booking Time States
Every booking must always exist in one of these three states:

### 1. Scheduled (More than 24 Hours Remaining)
- Time remaining: > 24 hours
- Booking is flexible
- Cancellations allowed

### 2. Locked (Within 24 Hours)
- Time remaining: ≤ 24 hours
- System automatically locks booking
- No manual override

### 3. Completed / Expired
- Inspection finished OR
- No-show confirmed
- Record permanently locked

Locking occurs automatically exactly 24 hours before inspection time.

---

## 3. Client Cancellation Rules

### A. Client Cancels Before 24 Hours (Not Locked)
**Conditions:**
- Time remaining > 24 hours
- Status = Scheduled

**System Must:**
- Cancel the booking
- Refund ₦2,500 to client
- Restore 1 inspection credit
- Remove ₦2,000 from agent expected earnings
- Cancel ₦500 platform pending revenue
- Log cancellation ID
- Log refund ID

**Status:** `“Cancelled — Refunded (Early)”`

---

### B. Client Cancels Within 24 Hours (Locked)
**Conditions:**
- Time remaining ≤ 24 hours
- Status = Locked

**System Must:**
- Deny refund
- Do not restore credit
- Forfeit ₦2,500
- Mark as late cancellation
- Pay agent ₦2,000
- Pay platform ₦500
- Log forfeiture

**Status:** `“Locked — Late Cancel (No Refund)”`

---

## 4. Agent Cancellation Rules

### A. Agent Cancels Before 24 Hours
**Conditions:**
- Time remaining > 24 hours
- Not locked

**System Must:**
- Cancel booking
- Refund ₦2,500 to client
- Restore client credit
- Remove ₦2,000 agent earnings
- Remove ₦500 platform allocation
- Issue agent warning
- Log incident

**Status:** `“Cancelled by Agent — Refunded”`

---

### B. Agent Cancels Within 24 Hours (Locked)
**Conditions:**
- Time remaining ≤ 24 hours

**System Rules:**
- **Default:** Cancellation is blocked
- **Emergency Override (Admin Approved):**
  - Refund ₦2,500 to client
  - Agent receives ₦0
  - Platform receives ₦0
  - Issue serious warning
  - Escalate to admin review

**Status:** `“Agent Cancelled After Lock — Penalty”`

---

## 5. Client No-Show Rules
### Trigger Conditions
A no-show is triggered when:
- Inspection timer expires
- Client did not confirm completion
- Client did not cancel
- Agent attended

### System Must Automatically:
- Mark client as “No Show”
- Forfeit ₦2,500
- Pay agent ₦2,000
- Pay platform ₦500
- Deduct 1 inspection credit
- Lock record permanently
- Log attendance metadata (timestamp, GPS/IP)

**Status:** `“Client No-Show — Forfeited”`
*No manual review is required.*

---

## 6. Successful Inspection Payment Logic
### Conditions
All of the following must be true:
- Client confirms completion
- Agent submits valid booking code
- Code is verified
- Timer is valid

### System Must:
- Deduct 1 inspection credit
- Mark inspection as certified
- Allocate ₦2,000 to agent (withdrawable)
- Allocate ₦500 to platform revenue
- Lock session
- Generate payout record

**Status:** `“Completed — Certified”`

---

## 7. Payment Distribution Engine
### Distribution Rule
From every ₦2,500 payment:

| Allocation | Amount |
| :--- | :--- |
| Agent | ₦2,000 |
| Platform | ₦500 |

### Distribution Only Occurs When:
- Inspection is certified, OR
- Client no-show confirmed, OR
- Late cancellation after lock

Early distribution is prohibited.

---

## 8. Refund Rules Summary

| Scenario | Client Refund | Agent Paid | Platform Paid |
| :--- | :--- | :--- | :--- |
| Client cancels >24hrs | ₦2,500 | ₦0 | ₦0 |
| Agent cancels >24hrs | ₦2,500 | ₦0 | ₦0 |
| Client cancels ≤24hrs | ₦0 | ₦2,000 | ₦500 |
| Agent cancels ≤24hrs (Emergency) | ₦2,500 | ₦0 | ₦0 |
| Client no-show | ₦0 | ₦2,000 | ₦500 |
| Successful inspection | ₦0 | ₦2,000 | ₦500 |

*This table must match system code exactly.*

---

## 9. Earnings & Revenue Dashboard Rules
### Agent Dashboard Categories
- **Expected:** (before lock)
- **Locked:** (within 24 hours)
- **Certified:** (completed)
- **Withdrawable:** (approved payout)
