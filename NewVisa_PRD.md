# NewVisa — Product Requirements Document (PRD)

**Product:** NewVisa — Visa, Immigration & Travel Booking Platform  
**Document Version:** 1.0  
**Document Status:** Product Requirements  
**Product Type:** Web Application  
**Architecture:** Modular Multi-Agent System  
**Primary Interfaces:** Customer Portal + Admin Panel

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Backend | Node.js |
| Database | Supabase / PostgreSQL |
| Authentication | Supabase Auth |
| File Storage | Supabase Storage |
| Deployment | Vercel |
| Source Control | GitHub |
| AI Architecture | Multi-Agent AI System |
| Travel Integration | B2B Flight/Hotel APIs |
| Notifications | Email + WhatsApp |
| Payments | Payment Gateway |

---

## 1. Executive Summary

**NewVisa** is a unified Visa, Immigration and Travel Booking platform designed to allow customers to manage their international journey from immigration discovery through travel.

The platform combines two major business verticals:

### Immigration
- Visa services
- Immigration opportunities
- Country information
- Eligibility assessment
- Consultation booking
- Lead management
- Document management
- Application management
- Application tracking

### Travel
- Flight search
- Flight booking
- Hotel search
- Hotel booking
- Flight + Hotel journeys
- Travel booking management

The two verticals should be capable of operating independently while also being integrated into a single customer journey.

The core journey is:

**Explore → Check Eligibility → Consultation → Documents → Application → Approval → Flight Booking → Hotel Booking → Travel**

The platform will additionally provide an **AI-powered multi-agent assistant** that helps customers navigate the platform, understand immigration services, complete eligibility assessments, manage documents, track applications and receive travel assistance.

---

## 2. Product Vision

NewVisa aims to become a single digital destination for customers planning to move, study, work, visit or travel internationally.

Instead of requiring customers to use separate platforms for:
- Visa information
- Immigration consultation
- Document submission
- Application tracking
- Flight booking
- Hotel booking

NewVisa brings these experiences together.

### Vision Statement

> **Make the journey abroad simpler by bringing immigration, visa assistance and travel booking into one intelligent platform.**

---

## 3. Problem Statement

Customers planning international travel or immigration typically have to coordinate multiple disconnected activities:

1. Research immigration options.
2. Determine eligibility.
3. Find a consultant.
4. Submit documents.
5. Track the application.
6. Wait for a decision.
7. Search for flights.
8. Search for accommodation.
9. Manage bookings.

This creates:
- Fragmented customer experience
- Manual operational processes
- Difficulty tracking application progress
- Repeated communication between customer and counsellor
- Limited visibility for administrators
- Separate travel and immigration workflows

NewVisa addresses this by providing a unified platform.

---

## 4. Product Goals

NewVisa should:
1. Generate and manage immigration leads.
2. Provide country and visa information.
3. Allow customers to check eligibility.
4. Automate initial lead creation.
5. Assign leads to appropriate counsellors.
6. Enable consultation booking.
7. Digitize document collection.
8. Track immigration applications.
9. Provide real-time flight search and booking.
10. Provide real-time hotel search and booking.
11. Combine flight and hotel planning.
12. Connect immigration completion with travel planning.
13. Provide secure online payments.
14. Provide automated notifications.
15. Provide an AI-powered customer assistant.
16. Provide centralized administrative management.
17. Support multiple travel suppliers.
18. Maintain a modular architecture for future expansion.

---

## 5. Product Users

### 5.1 Customer

The primary external user.

Customers can:
- Browse countries
- Explore visa categories
- Check eligibility
- Submit enquiries
- Book consultations
- Upload documents
- Track applications
- Communicate with counsellors
- Search flights
- Book flights
- Search hotels
- Book hotels
- View payments
- View travel bookings
- Interact with the AI assistant

### 5.2 Counsellor

Counsellors manage assigned immigration leads and applications.

Responsibilities:
- Lead management
- Customer communication
- Consultation
- Document requests
- Application updates
- Follow-ups
- Customer remarks
- Application progression

### 5.3 Documentation Team

Responsible for:
- Reviewing documents
- Approving/rejecting documents
- Requesting re-upload
- Adding document remarks

### 5.4 Immigration Admin
Responsible for immigration operations.

### 5.5 Travel Admin
Responsible for:
- Flight bookings
- Hotel bookings
- Suppliers
- Cancellations
- Refund status
- Travel operations

### 5.6 Finance
Responsible for:
- Payments
- Refunds
- Revenue
- Outstanding amounts
- Financial reports

### 5.7 Super Admin
Complete platform access.

---

## 6. User Interfaces

NewVisa will have two primary interfaces.

### Interface 1 — Customer Website

Public website + authenticated customer portal.

Major sections:
- Home
- Immigration
- Countries
- Visa Services
- Work Abroad
- Study Abroad
- Visit Visa
- Business Immigration
- Family Immigration
- Permanent Residency
- Citizenship
- Flights
- Hotels
- Flight + Hotel
- About Us
- Contact Us
- FAQs
- Login/Register
- Customer Dashboard
- AI Chatbot

### Interface 2 — Admin Panel

The admin panel provides role-based operational management across immigration, travel, customers, applications, documents, payments, CMS and AI-assisted operations.

---

## 7. Customer Homepage

The homepage should clearly communicate the two major NewVisa offerings:

**Visa & Immigration**

and

**Flights & Hotels**

Additional actions:
- Check Eligibility
- Book Consultation

### Hero

> **Your Journey Abroad Starts Here**

### Country Selection

Examples:
- Canada
- Australia
- UK
- USA
- Germany
- New Zealand
- Dubai/UAE
- Europe
- Other destinations

### Visa Categories
- Student Visa
- Work Visa
- Skilled Immigration
- Visitor Visa
- Business Visa
- Family Visa
- Permanent Residency
- Citizenship
- Dependent Visa
- Job Seeker Visa

---

## 8. Immigration Module

The immigration module will provide information and lead-generation functionality.

### Country Pages

Each country should have a dedicated landing page.

Example:

### Canada Immigration

Sections:
- Why Canada
- Immigration Options
- Work Opportunities
- Study Options
- Permanent Residency
- Family Sponsorship
- Visitor Visa
- Eligibility
- Required Documents
- Processing Information
- FAQs
- Consultation CTA

The structure should be reusable for additional countries.

---

## 9. Visa Service Pages

Every major visa service should have a dedicated page.

Example:

### Canada PR Visa

Sections:
- Overview
- Eligibility
- Who Can Apply
- Age Requirements
- Education Requirements
- Work Experience
- Language Requirements
- Financial Requirements
- Required Documents
- Application Process
- Estimated Processing Information
- Important Notes
- FAQs
- Consultation CTA

---

## 10. Eligibility Assessment

NewVisa will provide a multi-step eligibility assessment.

### Step 1 — Personal Information
- Name
- Email
- Mobile
- Date of Birth
- Country of Residence

### Step 2 — Destination
- Preferred Country
- Preferred City
- Immigration Objective

### Step 3 — Education
- Highest Qualification
- University/College
- Field of Study
- Graduation Year

### Step 4 — Work Experience
- Current Occupation
- Total Experience
- Industry
- Current Employer
- Job Position

### Step 5 — Language
- IELTS/PTE/TOEFL/Other
- Overall Score
- Individual Scores

### Step 6 — Financial
- Annual Income
- Available Funds
- Sponsorship Information

### Step 7 — Submission

Customer submits assessment.

### Result

The system creates a lead and assigns it to the appropriate counsellor/team.

---

## 11. Lead Management

Every submitted immigration enquiry becomes a lead.

### Lead Information
- Lead ID
- Name
- Mobile
- Email
- Country
- Visa Type
- Eligibility Status
- Lead Source
- Assigned Counsellor
- Lead Status
- Priority
- Created Date
- Last Contacted Date
- Next Follow-up Date

### Lead Lifecycle

```text
New
 ↓
Contacted
 ↓
Qualified
 ↓
Documents Pending
 ↓
Consultation Scheduled
 ↓
Application in Progress
 ↓
Submitted
 ↓
Under Review
 ↓
Approved / Rejected
 ↓
Closed
```

---

## 12. Counsellor Assignment

Leads may be assigned manually or automatically.

Assignment can consider:
- Country
- Visa category
- Counsellor availability
- Counsellor specialization
- Lead location

Counsellors should only see leads they are authorized to access.

---

## 13. Consultation Management

Customers can book consultations.

### Consultation Information
- Name
- Mobile
- Email
- Country
- Visa Type
- Preferred Date
- Preferred Time
- Consultation Type

### Types
- Phone Call
- Video Consultation
- Office Consultation

### Notifications

After booking:
- Customer notification
- Counsellor notification
- Admin notification
- Email confirmation
- WhatsApp confirmation where configured

---

## 14. Document Management

Customers can upload documents through their NewVisa dashboard.

### Documents
- Passport
- Photograph
- Education Certificates
- Mark Sheets
- Experience Letters
- Bank Statements
- IELTS/PTE Results
- Employment Documents
- Birth Certificate
- Marriage Certificate
- Other supporting documents

### Document Lifecycle

```text
Requested
 ↓
Uploaded
 ↓
Under Review
 ↓
Approved
```

Alternative:

```text
Rejected
 ↓
Re-upload Required
```

Counsellors/Admin/Documentation Team can add remarks.

---

## 15. Customer Dashboard

The dashboard should provide a consolidated view of the customer's NewVisa journey.

Sections:
- Profile
- My Applications
- Application Status
- Documents
- Consultations
- Payments
- Messages
- Notifications
- Flight Bookings
- Hotel Bookings
- Booking History

### Application Timeline

```text
Enquiry Submitted
        ↓
Eligibility Checked
        ↓
Counsellor Assigned
        ↓
Documents Submitted
        ↓
Application Prepared
        ↓
Application Submitted
        ↓
Under Processing
        ↓
Decision Received
```

---

## 16. Application Tracking

Each application receives a unique Application ID.

Customers can see:
- Current status
- Counsellor
- Submitted documents
- Pending documents
- Important updates
- Counsellor remarks
- Next action
- Timeline/history

Authorized staff can update application status.

---

## 17. Flight Booking

NewVisa will provide real-time flight search and booking.

### Search Types
- One Way
- Round Trip
- Multi City

### Search Inputs
- From
- To
- Departure Date
- Return Date
- Adults
- Children
- Infants
- Cabin Class

### Cabin Classes
- Economy
- Premium Economy
- Business
- First Class

---

## 18. Flight API Integration

NewVisa will integrate with an authorized B2B Flight API/GDS/Travel Aggregator.

Potential providers identified in the source scope include:
- TBO
- Amadeus
- Travelport
- Duffel

The final provider is a business/commercial dependency.

The API should support:
- Airport search
- Airline search
- Flight search
- Live availability
- Fare information
- Seat availability where supported
- Baggage information
- Fare rules
- Refund rules
- Cancellation rules
- Flight details
- Fare revalidation
- Booking
- PNR creation
- Ticket issuance
- Cancellation
- Refund/status information

---

## 19. Flight Booking Flow

```text
Search
  ↓
Live Flight Results
  ↓
Select Flight
  ↓
Fare Revalidation
  ↓
Traveller Details
  ↓
Review
  ↓
Payment
  ↓
Booking Request
  ↓
PNR
  ↓
Ticket Issued
  ↓
E-ticket
  ↓
Save Booking
  ↓
Email / WhatsApp Confirmation
```

Fare revalidation must occur immediately before booking wherever required by the supplier.

---

## 20. Hotel Booking

Customers can search hotels using live inventory.

### Search Inputs
- Destination
- Check-in
- Check-out
- Rooms
- Adults
- Children
- Star Rating
- Price Range
- Hotel Category
- Amenities

---

## 21. Hotel API

Potential suppliers include:
- TBO
- Hotelbeds
- RateHawk
- Expedia Rapid

The API should support:
- Destination search
- Hotel search
- Live availability
- Room availability
- Room types
- Meal plans
- Rate plans
- Images
- Descriptions
- Amenities
- Policies
- Cancellation policy
- Rate recheck
- Booking
- Confirmation
- Voucher generation
- Cancellation
- Refund/status information

---

## 22. Hotel Booking Flow

```text
Search Hotel
     ↓
Live Inventory
     ↓
Select Hotel
     ↓
Room/Rate Details
     ↓
Cancellation Policy
     ↓
Rate Recheck
     ↓
Guest Details
     ↓
Review
     ↓
Payment
     ↓
Booking API
     ↓
Confirmation
     ↓
Voucher
     ↓
Customer Dashboard
```

---

## 23. Flight + Hotel

NewVisa should support combined travel planning.

Example:

**Delhi → Toronto**

+

**Toronto Hotel — 7 Nights**

Flight and hotel may remain separate supplier transactions but must be grouped under a common:

**Travel Booking ID**

---

## 24. Immigration + Travel Integration

This is a key NewVisa feature.

When a customer's immigration application reaches an approved/ready-to-travel stage, NewVisa can display:

> **Your visa process is complete. Plan your journey.**

Actions:
- Book Flight
- Book Hotel
- View Travel Options

Counsellors can also create travel requirements for customers.

---

## 25. Admin Panel

The Admin Panel controls the complete NewVisa platform.

### Main Sections
- Dashboard
- User Management
- Lead Management
- Counsellor Management
- Application Management
- Document Management
- Consultation Management
- Travel Management
- Payment Management
- CMS
- Reports
- API Management
- Pricing/Markup
- Notifications
- Permissions
- Audit Logs

---

## 26. Admin Dashboard

Display:
- Total Leads
- New Leads
- Active Applications
- Pending Documents
- Consultations
- Visa Applications
- Flight Bookings
- Hotel Bookings
- Revenue
- Pending Payments
- Recent Activities

---

## 27. User Management

Admin can:
- Create users
- View users
- Edit users
- Disable users
- View applications
- View documents
- View payments
- View bookings

---

## 28. Counsellor Management

Admin can:
- Create counsellors
- Assign countries
- Assign visa categories
- Assign leads
- Track performance
- View follow-ups
- View applications
- Manage permissions

---

## 29. CMS

NewVisa administrators should be able to manage website content without developer involvement.

CMS should support:
- Countries
- Visa Categories
- Service Pages
- FAQs
- Blogs
- Testimonials
- Banners
- Offers
- Images
- SEO Metadata

---

## 30. Search & SEO

### Website Search

Users should be able to search:
- Countries
- Visa Services
- Travel Services
- Blogs
- FAQs

### SEO

Important pages should support:
- SEO title
- Meta description
- Keywords
- Canonical URL
- Open Graph image
- Schema markup
- Clean URL
- Sitemap
- Robots configuration

Example:

```text
/countries/canada
/visa/canada-pr
/visa/uk-student-visa
/flights
/hotels
```

---

## 31. Authentication

NewVisa should support:
- Registration
- Login
- Forgot Password
- Reset Password
- Profile updates
- Email/mobile verification where required

Social login may be added later.

---

## 32. Role-Based Access Control

RBAC must be implemented.

| Role | Access |
|---|---|
| Super Admin | Complete platform |
| Immigration Admin | Immigration operations |
| Counsellor | Assigned leads/applications |
| Documentation Team | Documents/application processing |
| Travel Admin | Travel operations |
| Finance | Payments/refunds/reports |
| Customer | Own data only |

---

## 33. Payment System

Payments may be required for:
- Consultations
- Immigration services
- Flight bookings
- Hotel bookings
- Other services

Payment records should contain:
- Payment ID
- Customer
- Amount
- Transaction ID
- Payment Gateway
- Payment Status
- Date
- Related Service
- Refund Status

---

## 34. Travel Pricing & Markup

NewVisa should support configurable pricing.

Example:

```text
Supplier Fare       ₹20,000
Platform Markup      ₹1,000
----------------------------
Customer Price      ₹21,000
```

Supported pricing rules:
- Fixed markup
- Percentage markup
- Country-wise markup
- Airline-wise markup
- Travel-product markup
- Hotel markup
- Promotional discounts

---

## 35. Cancellation & Refund

NewVisa should not independently calculate airline/hotel refunds unless explicitly supported by supplier rules.

Flow:

```text
Cancellation Request
       ↓
Supplier API
       ↓
Cancellation Eligibility
       ↓
Cancellation Fee
       ↓
Refund Amount
       ↓
Cancellation Status
       ↓
Display to Customer/Admin
```

---

## 36. Notifications

### Email

Notifications should support:
- Registration
- Eligibility submission
- Consultation confirmation
- Document request
- Application updates
- Payment confirmation
- Flight booking
- Hotel booking
- Cancellation
- Refund
- Ticket/Voucher delivery

### WhatsApp

Where enabled:
- Lead notification
- Counsellor communication
- Appointment reminder
- Document reminder
- Application update
- Booking confirmation
- Travel reminder

---

## 37. Multi-Agent AI System

AI is a core component of NewVisa.

The system should not depend on one generic chatbot.

Instead, NewVisa should use a **multi-agent architecture** where specialized agents handle different domains.

### AI Architecture

```text
                 CUSTOMER
                    ↓
             AI CHATBOT UI
                    ↓
             AI ORCHESTRATOR
                    ↓
       ┌────────────┼────────────┐
       ↓            ↓            ↓
 IMMIGRATION      TRAVEL       SUPPORT
    AGENTS        AGENTS        AGENTS
       ↓            ↓            ↓
 Eligibility     Flights       FAQs
 Documents       Hotels        Navigation
 Application     Planning      General Help
       ↓            ↓            ↓
       └────────────┼────────────┘
                    ↓
              Node.js Backend
                    ↓
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    Supabase    Travel APIs   Other APIs
```

---

## 38. AI Agents

### Agent 1 — Customer Support Agent

Responsibilities:
- General questions
- FAQs
- Platform navigation
- Service discovery
- Basic assistance

### Agent 2 — Immigration Agent

Responsibilities:
- Explain countries
- Explain visa categories
- Explain services
- Explain requirements
- Guide customers toward appropriate services

The agent should use approved NewVisa content/knowledge.

### Agent 3 — Eligibility Agent

Responsibilities:
- Collect eligibility information
- Identify missing information
- Perform preliminary assessment
- Recommend relevant visa/service category
- Recommend next steps

The AI should not guarantee visa approval.

### Agent 4 — Document Agent

Responsibilities:
- Explain required documents
- Identify pending documents
- Explain document status
- Explain re-upload requirements
- Guide customers through document submission

### Agent 5 — Application Agent

Responsibilities:
- Explain application status
- Explain next action
- Summarize application progress
- Provide authorized application information

### Agent 6 — Travel Agent

Responsibilities:
- Help customers search flights
- Help search hotels
- Explain booking options
- Assist with travel planning
- Help customers navigate bookings

Actual inventory and prices must come from authorized travel APIs.

### Agent 7 — Travel Recommendation Agent

Can recommend travel options based on:
- Destination
- Dates
- Budget
- Preferences
- Immigration journey

### Agent 8 — Notification/Follow-up Agent

Can assist with:
- Appointment reminders
- Document reminders
- Application updates
- Travel reminders

### Agent 9 — Admin Operations Agent

For authorized internal users.

Can assist with:
- Lead summaries
- Pending documents
- Follow-ups
- Application summaries
- Booking summaries
- Operational information

---

## 39. AI Orchestrator

The AI Orchestrator determines which agent should handle each request.

Example:

Customer:

> "What documents do I need for Canada PR?"

```text
Chatbot
   ↓
Orchestrator
   ↓
Immigration Agent
   ↓
Approved Knowledge Base
   ↓
Response
```

Customer:

> "Which documents have I not uploaded yet?"

```text
Chatbot
   ↓
Orchestrator
   ↓
Document Agent
   ↓
Authenticated Backend API
   ↓
Customer's Document Data
   ↓
Response
```

Customer:

> "Find me a flight to Toronto."

```text
Chatbot
   ↓
Orchestrator
   ↓
Travel Agent
   ↓
Node.js Backend
   ↓
Flight API
   ↓
Live Results
```

---

## 40. AI Tool Access

AI agents must **not directly access databases or third-party APIs**.

Instead:

```text
AI Agent
   ↓
Controlled Tool
   ↓
Node.js API
   ↓
Authorization
   ↓
Database / External API
```

This ensures:
- Security
- Authorization
- Auditability
- Predictable behavior
- Supplier abstraction
- Controlled AI actions

---

## 41. AI Chatbot

The chatbot should be available throughout the customer-facing NewVisa website.

### Capabilities
- Answer FAQs
- Explain visa services
- Explain countries
- Assist with eligibility
- Explain document requirements
- Explain application status
- Help with travel
- Help find flights
- Help find hotels
- Guide customers through bookings
- Recommend consultations
- Escalate to a human counsellor

---

## 42. Authentication-Aware AI

### Anonymous Customer

The AI can provide:
- General immigration information
- General travel information
- FAQs
- Platform guidance

### Authenticated Customer

The AI may provide authorized personalized information:
- Application status
- Document status
- Consultation information
- Booking information
- Payment information

The AI must verify authorization before accessing personal information.

---

## 43. AI Guardrails

Because NewVisa handles immigration information and sensitive customer data:

The AI must:
- Use approved information where applicable.
- Avoid fabricating visa requirements.
- Avoid guaranteeing visa approval.
- Avoid inventing processing times.
- Clearly identify uncertain information.
- Escalate complex cases to counsellors.
- Require authentication for personal information.
- Respect role-based permissions.
- Log important AI actions.
- Restrict tool access.
- Never expose internal credentials.
- Never expose another customer's information.

---

## 44. Technical Architecture

### Frontend

**Next.js**

Responsibilities:
- Public website
- Customer portal
- Admin panel
- Booking interface
- AI chatbot
- SEO
- Responsive UI

### Backend

**Node.js**

Responsibilities:
- Business logic
- REST/API layer
- AI orchestration
- Travel integrations
- Payment integrations
- Notifications
- Webhooks
- Authentication/authorization logic
- Supplier abstraction

### Database

**Supabase PostgreSQL**

Core entities:

```text
users
roles
permissions
user_roles

countries
visa_categories
visa_services
cms_pages
faqs
blogs

eligibility_assessments
leads
counsellors
applications
application_status_history

documents
document_requests

consultations
messages
notifications

payments

flight_searches
flight_bookings

hotel_searches
hotel_bookings

travel_bookings

suppliers
pricing_rules
markup_rules

ai_conversations
ai_messages
ai_tool_logs

audit_logs
```

---

## 45. Supabase

Supabase will provide:
- PostgreSQL database
- Authentication
- File storage
- Database APIs where appropriate
- Row-Level Security
- Database functions where appropriate

Sensitive customer information and documents must be protected using appropriate access policies.

---

## 46. File Storage

Supabase Storage can be used for:
- Passport documents
- Certificates
- Employment documents
- Financial documents
- Application files
- Website images
- CMS assets

Access to customer documents must be restricted by authentication and role.

---

## 47. Travel Integration Architecture

Supplier credentials must remain server-side.

```text
Next.js
   ↓
Node.js Backend
   ↓
Travel Integration Layer
   ↓
Supplier Adapter
   ↓
Flight / Hotel API
```

This ensures that NewVisa can replace or add suppliers without changing the customer-facing application.

---

## 48. Multi-Supplier Architecture

```text
Flight Service
 ├── Provider A
 └── Provider B

Hotel Service
 ├── Provider A
 └── Provider B
```

A supplier abstraction layer should allow:
- Supplier switching
- Supplier failover where appropriate
- Multiple suppliers
- Future supplier additions

---

## 49. Security

NewVisa handles sensitive customer and passport information.

Security requirements include:
- HTTPS
- Secure authentication
- RBAC
- Row-Level Security
- Secure document storage
- Backend-only API credentials
- Secure payments
- Audit logging
- Session management
- Rate limiting
- Input validation
- API validation
- Secure file uploads
- File-type validation
- Malware validation
- Database backups

---

## 50. Deployment Architecture

### GitHub

GitHub will be the source-control platform.

Recommended branches:

```text
main
develop
feature/*
bugfix/*
release/*
```

Production changes should go through Pull Requests.

### Vercel

Recommended environments:

```text
Development
Preview
Production
```

Environment variables and secrets must be managed securely.

Sensitive credentials must never be committed to GitHub.

---

## 51. High-Level System Architecture

```text
                         NEWVISA
                            │
                ┌───────────┴───────────┐
                │                       │
         CUSTOMER INTERFACE        ADMIN INTERFACE
             Next.js                   Next.js
                │                       │
                └───────────┬───────────┘
                            │
                     Node.js Backend
                            │
        ┌───────────────────┼──────────────────┐
        │                   │                  │
        ▼                   ▼                  ▼
 Immigration Services   Travel Services   AI Services
        │                   │                  │
        │                   │           AI Orchestrator
        │                   │                  │
        │             ┌─────┴─────┐     ┌────┴────┐
        │             │           │     │         │
        │          Flights      Hotels  Agents    Tools
        │             │           │
        └─────────────┼───────────┼──────────────┐
                      │           │              │
                      ▼           ▼              ▼
                  Travel APIs  Supabase       Services
                              PostgreSQL
                              Storage
                              Auth
                                 │
                                 ▼
                              Vercel
                                 │
                              GitHub
```

---

## 52. End-to-End Immigration Journey

```text
Customer
   ↓
NewVisa Website
   ↓
Immigration
   ↓
Country
   ↓
Visa Category
   ↓
Service Information
   ↓
Eligibility Assessment
   ↓
Lead Creation
   ↓
Counsellor Assignment
   ↓
Consultation
   ↓
Documents Requested
   ↓
Documents Uploaded
   ↓
Document Verification
   ↓
Application Prepared
   ↓
Application Submitted
   ↓
Application Tracking
   ↓
Visa Decision
   ↓
Approved
   ↓
Travel Planning
   ↓
Flight Booking
   ↓
Hotel Booking
   ↓
Travel
```

---

## 53. Direct Travel Journey

```text
Customer
   ↓
Flights & Hotels
   ↓
Flight / Hotel Search
   ↓
Live API Results
   ↓
Selection
   ↓
Fare / Rate Revalidation
   ↓
Customer Details
   ↓
Payment
   ↓
Supplier Booking
   ↓
Confirmation
   ↓
Ticket / Voucher
   ↓
Travel Booking ID
   ↓
Customer Dashboard
```

---

## 54. Development Roadmap

### Phase 1 — Business Planning

Finalize:
- Countries
- Visa categories
- Services
- Pricing
- Application process
- User roles
- Payment requirements
- Travel requirements

### Phase 2 — Architecture

Finalize:
- Database schema
- API architecture
- Authentication
- RBAC
- Travel supplier
- Payment provider
- Notification providers
- AI architecture
- Security architecture

### Phase 3 — UI/UX

Design:
- Homepage
- Country pages
- Visa pages
- Eligibility
- Consultation
- Login/Register
- Customer dashboard
- Flight booking
- Hotel booking
- Checkout
- Admin panel
- AI chatbot

### Phase 4 — Immigration

Build:
- CMS
- Countries
- Visa services
- Eligibility
- Leads
- Counsellors
- Documents
- Applications
- Consultation
- Customer dashboard

### Phase 5 — Travel

Build:
- Flight API
- Hotel API
- Search
- Results
- Filters
- Revalidation
- Booking
- Cancellation
- Refund status
- Ticket/Voucher

### Phase 6 — Payments & Notifications

Build:
- Payment gateway
- Email
- WhatsApp

### Phase 7 — AI

Build:
- AI chatbot
- Orchestrator
- Immigration agent
- Eligibility agent
- Document agent
- Application agent
- Travel agent
- Recommendation agent
- Support agent
- Admin agent
- AI tools
- Guardrails
- Human escalation

### Phase 8 — Admin & Reporting

Build:
- Dashboard
- User management
- Lead management
- Applications
- Travel management
- Payments
- Reports
- CMS

### Phase 9 — Testing

Test:
- Functional flows
- APIs
- Payments
- Flights
- Hotels
- Cancellation
- Refunds
- Security
- RBAC
- AI
- Mobile
- Browser compatibility
- Performance

### Phase 10 — Production

- Production APIs
- Payment credentials
- Vercel deployment
- Domain
- SSL
- Production database
- Backups
- Monitoring
- Final QA
- Go Live

---

## 55. MVP Definition

The first production-ready version should prioritize the complete core journey.

### Immigration MVP
- Homepage
- Countries
- Visa services
- Eligibility assessment
- Lead management
- Counsellor assignment
- Consultation
- Document upload
- Application tracking
- Customer dashboard
- Admin panel
- CMS
- Authentication

### Travel MVP
- Flight search
- Hotel search
- Flight booking
- Hotel booking
- Fare/rate revalidation
- Payment
- Cancellation
- Booking history
- Ticket/voucher
- Travel Booking ID

### AI MVP
- Customer chatbot
- FAQ Agent
- Immigration Agent
- Eligibility Agent
- Document Agent
- Application Status Agent
- Travel Agent
- Human escalation

---

## 56. Future Enhancements

Potential future functionality:
- AI-powered document extraction
- AI document completeness verification
- AI lead scoring
- AI counsellor assistant
- Predictive conversion analytics
- Advanced travel recommendations
- Additional suppliers
- Mobile application
- Loyalty/rewards
- Personalized travel packages
- Multilingual chatbot
- Automated marketing
- Advanced analytics

---

## 57. Key Success Metrics

### Immigration
- Website visitors
- Eligibility assessments
- Leads generated
- Lead → consultation conversion
- Consultation → application conversion
- Application approval rate
- Application processing time
- Pending documents
- Counsellor performance

### Travel
- Flight searches
- Hotel searches
- Booking conversion
- Flight revenue
- Hotel revenue
- Average booking value
- Cancellation rate
- Refund value
- Markup revenue

### AI
- Number of conversations
- Resolution rate
- Human escalation rate
- Eligibility completion rate
- Customer satisfaction
- AI-assisted conversion rate

---

## 58. Acceptance Criteria

### Customer
- Customer can register/login.
- Customer can browse countries.
- Customer can browse visa services.
- Customer can complete eligibility assessment.
- Customer can submit enquiries.
- Customer can book consultations.
- Customer can upload documents.
- Customer can track applications.
- Customer can view payments.
- Customer can search flights.
- Customer can search hotels.
- Customer can book flights/hotels.
- Customer can view bookings.
- Customer can receive notifications.
- Customer can interact with the AI chatbot.

### Admin
- Admin can manage customers.
- Admin can manage leads.
- Admin can assign counsellors.
- Admin can manage applications.
- Admin can review documents.
- Admin can manage travel bookings.
- Admin can manage payments.
- Admin can manage CMS.
- Admin can manage pricing.
- Admin can view reports.
- RBAC is enforced.

### AI
- AI can identify customer intent.
- Orchestrator can route requests to appropriate agents.
- Agents can use authorized tools.
- AI can access customer data only after authorization.
- AI can assist with immigration information.
- AI can assist with eligibility.
- AI can assist with documents.
- AI can assist with application status.
- AI can assist with travel.
- AI can escalate complex cases to humans.

### Security
- Supplier credentials are never exposed to frontend.
- Sensitive documents are protected.
- Customer data is isolated.
- RBAC is enforced.
- API requests are validated.
- File uploads are validated.
- Audit logs are maintained.
- Database backups are configured.

---

## 59. Business Dependencies

The following must be finalized by the business/client.

### Immigration
- Country list
- Visa/service list
- Service pricing
- Application process
- Required document list
- Consultation fees
- Company information
- Website content
- Legal/policy content

### Travel
- Flight API provider
- Hotel API provider
- B2B agreements
- API credentials
- Commercial terms
- Supplier payment/credit setup
- Markup rules
- Cancellation/refund policies

### Payments
- Payment gateway
- Business/KYC verification
- Settlement details

### Notifications
- Email provider
- WhatsApp Business/API setup

---

## 60. Product Principles

### 1. Modular
Immigration and travel should be independently deployable/extendable modules.

### 2. API-First
External integrations should be isolated behind backend APIs.

### 3. Secure by Design
Customer, passport and payment information must be protected from the beginning.

### 4. AI-Assisted, Not AI-Controlled
AI should assist customers and employees while critical business actions remain controlled through authorized backend services and human oversight.

### 5. Supplier Independent
Travel APIs should use an abstraction layer so suppliers can be replaced.

### 6. Customer-Centric
The customer should be able to see their complete journey from enquiry to travel.

### 7. Scalable
The architecture should allow additional:
- Countries
- Visa categories
- Suppliers
- Airlines
- Hotels
- Payment gateways
- Travel services
- AI agents

without rebuilding the entire platform.

---

## 61. Final Product Definition

**NewVisa** will function as a unified:

> **Immigration Consultancy + Visa Application Management + Flight Booking + Hotel Booking + Customer Portal + Admin Management + AI Assistant Platform**

The complete customer journey will be:

**Explore → Check Eligibility → Consultation → Documents → Application → Approval → Flight Booking → Hotel Booking → Travel**

The platform will also support independent travel customers:

**Flight Search → Flight Booking**

and:

**Hotel Search → Hotel Booking**

The architecture will be based on:

**Next.js + Node.js + Supabase + Vercel + GitHub**

with a modular **multi-agent AI layer** and secure backend-controlled integrations.

The system will be designed so that NewVisa can evolve from an immigration and travel website into a scalable AI-powered international mobility platform.
