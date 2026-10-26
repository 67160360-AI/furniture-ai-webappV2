---
target: the checkout page
total_score: 36
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:C:\\งาน\\furniture-ai V2\\maison-forme\\app\\checkout\\page.tsx"
target_fingerprint: "sha256:ddea86c290a5422cf85482b16518992167648f4e9078dcc8d122874f6f90333c"
target_path: "C:\\งาน\\furniture-ai V2\\maison-forme\\app\\checkout\\page.tsx"
timestamp: 2026-10-26T12-46-34Z
slug: app-checkout-page-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 4 | Clear step numbering (1-2-3), inline field validation icons, PromptPay timer |
| 2 | Match System / Real World | 4 | Localized Thai e-commerce conventions (PromptPay, White-glove installation, COD) |
| 3 | User Control and Freedom | 3 | Back link to cart and modal dismissal work well; card inputs lack clear reset |
| 4 | Consistency and Standards | 4 | Strict adherence to Maison Forme Sculpted Clay design tokens and typography |
| 5 | Error Prevention | 3 | Real-time blur validation on address, but credit card fields lack client constraint gates |
| 6 | Recognition Rather Than Recall | 4 | Sticky order summary keeps products, options, and live subtotal visible |
| 7 | Flexibility and Efficiency | 3 | 1-click clipboard copy for bank account; native browser autocomplete enabled |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained Ceramic Cream cards, calm Periwinkle background, zero visual clutter |
| 9 | Error Recovery | 4 | Inline field-level error messages pinpoint issues without wiping user input |
| 10 | Help and Documentation | 3 | 24-hr order revision guarantee and delivery notices present inline |
| **Total** | | **36/40** | **Excellent (36–40)** |

#### Design Specificity Verdict

**LLM assessment**: The checkout page possesses exceptional product specificity. Far from generic SaaS checkout templates, it is purpose-built for an artisanal Thai furniture atelier: offering specialized White-Glove installation (ทีมช่างยกขึ้นห้องและประกอบ), Thonglor showroom self-pickup, real-time PromptPay QR with bank confirmation, and prominent guarantees for made-to-order AI custom specifications.

**Deterministic scan**: `impeccable detect` inspected `app/checkout/page.tsx` and returned 0 rule violations.

#### Overall Impression
A reassuring, high-trust checkout experience. The 3-stage progressive card structure and mobile bottom summary dock eliminate purchase anxiety and reduce cognitive load during high-ticket furniture transactions.

#### What's Working
1. **Frictionless Mobile Sticky Dock:** The floating mobile bar with safe-area padding (`pb-[max(1rem,env(safe-area-inset-bottom))]`) keeps the total and action button permanently within single-thumb reach.
2. **Reassuring Thai Payment Architecture:** Realistic PromptPay QR modal with countdown timer and one-click account copying bridges digital ordering with familiar Thai banking habits.
3. **Non-destructive Inline Validation:** Fields validate on blur with accessible ARIA descriptions and green confirmation badges, providing immediate positive reinforcement.

#### Priority Issues
- **[P1] Credit Card Form Lacks Input Constraints:** If the user selects credit card payment, they can submit the order even if card number, expiry, and CVV are blank, bypassing the client validation gate.
  - *Fix:* Add conditional field validation for `cardNumber`, `cardExpiry`, and `cardCvv` when `paymentMethod === 'credit_card'`.
  - *Suggested command:* `/impeccable harden app/checkout/page.tsx`
- **[P2] Countdown Timer Triggers Full Page Re-render:** The 1-second interval timer for PromptPay re-evaluates the entire `CheckoutPage` component tree every second while the modal is open.
  - *Fix:* Extract the PromptPay modal into an isolated child component with its own local timer.
  - *Suggested command:* `/impeccable optimize app/checkout/page.tsx`
- **[P2] Delivery Date / Time Slot Picker Missing:** High-value furniture requires coordinated delivery, yet the form only offers a free-text notes input.
  - *Fix:* Introduce an interactive preferred delivery date selector or day-part pill picker (เช้า / บ่าย / เสาร์-อาทิตย์).
  - *Suggested command:* `/impeccable shape app/checkout/page.tsx`

#### Persona Red Flags
- **Casey (Distracted Mobile User):** The PromptPay QR modal requires scanning with another device or saving a screenshot; there is no direct deep-link button to open Thai banking apps (K PLUS, SCB EASY).
- **Riley (Deliberate Stress Tester):** Selecting "บัตรเครดิต" and clicking "ยืนยันการสั่งซื้อ" with empty card fields successfully creates an order without throwing a validation error.
- **Jordan (Confused First-Timer):** May wonder whether custom AI furniture dimensions can still be adjusted after paying. (Reassurance text is small at the bottom of the right column).

#### Minor Observations
- The bank transfer slip upload accepts any image, but lacks a preview thumbnail of the uploaded slip.
- The delivery note placeholder ("กรุณาโทรแจ้งก่อนส่ง 30 นาที") is good, but could include a chip to auto-insert common notes.

#### Questions to Consider
- Should we add a preferred delivery calendar picker so customers can book an exact installation day?
- Would a 1-click banking deep link enhance the mobile PromptPay experience?
