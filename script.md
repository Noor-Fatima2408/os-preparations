# NADRA Smart Queue Management System

**Semester Project Documentation**

Date: <!-- auto-generated -->

---

## 1. PROJECT INTRODUCTION & OVERVIEW

### 1.1 Project Title

NADRA Smart Queue Management System (NADRA-SQMS)

### 1.2 Project Statement

The NADRA Smart Queue Management System is an enterprise-grade, real-time queue management and floor operations platform designed for the National Database and Registration Authority (NADRA) of Pakistan. It replaces legacy sequential ticketing systems with a modern, distributed, deterministic scheduler that ensures zero duplicate token generation, prevents double-calling of citizens, and provides real-time transparency to customers, staff operators, and administrators.

The system processes thousands of citizen registrations daily across high-concurrency multi-counter environments, handling CNIC updates, passport issuance, and child registration services with automatic load balancing, self-healing resilience, and mathematical fairness through priority-aging scheduling.

### 1.3 Target Stakeholders

- **Citizens/Customers:** End users requesting services, monitoring queue position, and receiving real-time updates
- **Staff Operators:** Counter agents processing transactions, calling customers, and updating counter availability
- **System Administrators:** Center managers configuring services, managing staff, publishing announcements, and reviewing audit logs

### 1.4 Key Business Goals

- Zero sequence duplication through transactional token generation
- Eliminate double-calling via row-level locking mechanisms
- Sub-second real-time UI synchronization using Server-Sent Events
- Mathematically bounded wait times with priority-aging schedulers
- Self-healing resilience with automatic counter release on session disconnects

---

## 2. SYSTEM REQUIREMENTS

### 2.1 Functional Requirements

#### Token Generation & Management

- Generate unique daily sequential token numbers with guaranteed atomicity
- Prevent duplicate sequence IDs under concurrent rapid requests
- Support token cancellation and re-activation by citizens
- Track token lifecycle: waiting → serving → skipped/completed

#### Queue Scheduling & Call Next

- Implement priority-aging algorithm to prevent service starvation
- Call next customer without race conditions or double-calling
- Assign tickets to available counters with transactional safety
- Auto-skip absent customers and move to next in queue

#### Real-Time Notifications & Streaming

- Broadcast queue updates to public TV displays via SSE
- Send native Web Push notifications to customers
- Notify operators instantly when their counter is assigned a customer
- Provide wait time estimates with accuracy ± 5 minutes

#### Administration & Configuration

- Create, update, delete service types (e.g., General, Executive, Passport)
- Configure physical counter terminals with unique identifiers
- Manage staff profiles, roles, availability, and counter assignments
- Publish announcements visible on lobby displays
- Export audit logs and analytics reports

### 2.2 Non-Functional Requirements

#### Performance

- Support ≥ 1000 concurrent connections per center
- Token generation latency ≤ 500 ms under peak load
- Queue update SSE propagation ≤ 1 second

#### Reliability & Availability

- System availability target: 99.5% uptime
- Automatic recovery from database connection failures
- Graceful degradation when push notification service is unavailable

#### Security

- Enforce role-based access control (RBAC) for all endpoints
- Use secure httpOnly cookies for JWT token storage
- Implement rate limiting to prevent abuse
- Mask sensitive PII in customer notifications

#### Scalability

- Horizontal scaling via stateless API servers
- Database connection pooling for high-concurrency scenarios
- Support growth from 5 to 50+ counters per facility

---

## 3. SYSTEM FEATURES & CAPABILITIES

### 3.1 Customer Portal Features

- **Service Discovery:** Browse available services with descriptions and average processing times
- **Token Generation:** Request a queue token from self-service kiosk or mobile app
- **Real-Time Queue Status:** View current position, estimated wait time, and next 3 customers
- **Push Notifications:** Receive native OS alerts when it's their turn
- **Ticket Management:** Cancel waiting token or view history of past transactions
- **Service Feedback:** Rate experience and submit comments after completion

### 3.2 Operator Console Features

- **Counter Assignment:** Select active counter desk at login
- **Call Next Citizen:** One-click button to call highest-priority waiting customer
- **Active Ticket Details:** Display serving customer name, service type, estimated duration
- **Transaction Status:** Mark ticket as completed or skipped (customer absent)
- **Availability Toggle:** Update status to busy/available/on-break
- **Queue Insight:** View pending queue list and next waiting customers

### 3.3 Administrator Dashboard

- **Real-Time Floor Overview:** Monitor all active counters, operators, and current queue status
- **Service Management:** Create, edit, disable service types with priority levels
- **Counter Configuration:** Add, remove, or modify counter terminals
- **Staff Management:** Create operator accounts, assign roles, manage availability
- **Announcements Board:** Publish time-scheduled messages visible on lobby TVs
- **Analytics & Reporting:** Export daily/weekly metrics: average wait times, throughput, service times
- **Audit Logging:** Detailed logs of all operator actions with timestamps

---

## 4. PROJECT SCOPE

### 4.1 What is Included

- Core queue management system with token generation and scheduling
- Three user-facing portals: Customer, Operator, Administrator
- Real-time data synchronization via Server-Sent Events
- Web Push notification system for customer alerts
- JWT-based authentication with refresh token rotation
- Comprehensive audit logging and activity tracking
- Automated testing suites for concurrency and transaction safety
- PWA support with offline fallback capabilities

### 4.2 What is Explicitly Excluded

- SMS integration (out of scope; Web Push only)
- Multi-language support (English interface only)
- Advanced financial reporting and billings modules
- Integration with external HR or payroll systems
- On-site maintenance or field support

### 4.3 Technology Stack

- **Frontend:** React 19, Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS, HSL palette customization, Glassmorphism
- **Backend:** Node.js 20, Next.js API routes
- **Database:** MySQL 8.0 with Prisma ORM 5.10
- **Real-Time:** Server-Sent Events (SSE), Web Push API
- **Testing:** Vitest 4.0 with concurrent testing utilities
- **Deployment:** Vercel, AWS EC2, or Docker-based environments

---

## 5. VERIFICATION & VALIDATION

### 5.1 Verification (Building the System Right)

> Verification ensures that the system is built according to design specifications and architectural blueprints.

- **Code Reviews:** Enforce peer review on all TypeScript components; check adherence to ESLint and Prettier
- **Unit Testing:** Vitest suite with ≥ 85% coverage; isolated testing of utility functions; mock Prisma queries
- **Integration Testing:** End-to-end API path verification; test concurrent calls using Promise.allSettled(); verify SSE broadcast mechanics
- **Database Schema Validation:** Verify Prisma schema migrations without data loss; ensure index structure matches performance targets; test foreign key constraints

### 5.2 Validation (Building the Right System)

> Validation ensures that the finished system meets actual user needs and business requirements.

- **Functional Acceptance Testing:** Citizens can generate tokens and view queue position correctly; operators call next without double-calling; admins manage services/counters/staff
- **Load & Stress Testing:** Simulate 1000+ concurrent users; verify DB handles 500+ tokens/sec; test SSE with 100+ displays
- **User Acceptance Testing (UAT):** Pilot deployment at one NADRA center with 100+ staff and customers; gather UI feedback
- **Security & Compliance:** Penetration testing for OWASP Top 10; verify PII encryption; audit JWT refresh logic; test rate limiting

---

## 6. DATABASE MODELS & CLASS DIAGRAMS

### 6.1 Entity Relationship Model

The system maintains nine core entities with the following relationships:

| Entity     | Primary Purpose                                  | Key Relationships                                      |
|------------|--------------------------------------------------|-------------------------------------------------------|
| customers  | Store citizen profiles and credentials           | 1-to-many: tokens, push_subscriptions                 |
| services   | Define service categories (General, Executive)    | 1-to-many: tokens, staff                              |
| counters   | Physical counter terminals                       | 1-to-many: tokens                                     |
| staff      | Operator and admin user accounts                 | FK: services, many-to-one notifications               |
| tokens     | Queue tickets with status lifecycle              | FK: customers, services, counters; 1-to-1: feedback   |
| feedback   | Customer satisfaction ratings                    | 1-to-1: tokens                                        |
| notifications | Alert messages for users                      | FK: tokens, customers, staff                          |
| audit_logs | Activity tracking for compliance                 | actor_id, entity_id, action, metadata                 |

### 6.2 Core Application Services

- **Authentication & Authorization:** TokenValidator (JWT HS256), SessionManager, RoleBasedAccessControl
- **Input Validation & Sanitization:** InputValidator, EmailNormalizer
- **Real-Time Streaming:** SSEBroadcaster, WebPushDispatcher
- **Database & ORM:** PrismaClient singleton; TransactionManager with deadlock retry logic
- **Logging & Monitoring:** AuditLogger, ErrorHandler, RateLimiter

---

## 7. SYSTEM ARCHITECTURE SUMMARY

### 7.1 Architecture Overview

NADRA-SQMS follows a modern three-tier microservices-friendly architecture.

**Presentation Layer**

- React 19 components rendered server-side via Next.js 16
- Responsive UI with Tailwind CSS and Glassmorphism
- PWA manifest for offline support and installability

**API Layer**

- RESTful endpoints with JSON
- Middleware: authentication, validation, rate limiting
- Server-Sent Events streams for real-time broadcasts

**Data Layer**

- MySQL 8.0 with Prisma ORM
- Compound indexes optimized for token lookups
- Transaction isolation (ReadCommitted) to prevent concurrent conflicts

### 7.2 Deployment Architecture

- Docker containers for Next.js API server (stateless)
- Kubernetes or AWS ECS for orchestration and auto-scaling
- CloudFront CDN for static assets
- Managed MySQL with automated backups
- Redis cache (optional) for sessions and rate limits
- CloudWatch logs for centralized monitoring

---

## 8. IMPLEMENTATION STATUS

### 8.1 Fully Completed Modules

- Prisma schema with MySQL indexes and relationships
- Transactional token generation with SELECT FOR UPDATE locking
- Call Next scheduler with row-level isolation
- Real-time SSE streaming for public queue displays
- JWT authentication with httpOnly cookie support
- Multi-threaded Vitest suites for concurrency testing
- PWA configuration with service worker manifest

### 8.2 In Progress / Partially Complete

- Announcements board data model — schema ready; admin UI being finalized
- Custom rate-limiting middleware store — basic Redis/in-memory implemented; optimization pending
- Analytics dashboard — data aggregation queries written; visualization pending

### 8.3 Future Enhancements

- Multi-language localization (Urdu, Pashto, etc.)
- SMS integration for low-bandwidth environments
- Advanced reporting and BI dashboards
- Mobile app (React Native or Flutter)
- Integration with NADRA's existing CNIC/biometric databases

---

## 9. CONCLUSION

The NADRA Smart Queue Management System represents a comprehensive, production-ready solution to critical operational challenges faced by Pakistan's premier citizen registration authority. By leveraging modern distributed systems engineering patterns — transactional isolation, lock-free algorithms, real-time streaming, and automated resilience — the system delivers a platform that is simultaneously scalable, fair, transparent, and resilient to the high-concurrency, mission-critical demands of a national service center.

This documentation provides technical stakeholders — developers, architects, administrators, and QA teams — with the architectural blueprints, functional specifications, test strategies, and compliance measures necessary to deploy, operate, and maintain the system in production environments serving thousands of citizens daily.

---

**Generated from**: `script.js`

# script.js

The following is the full contents of the project's `script.js` file.

```js
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, 
        AlignmentType, WidthType, BorderStyle, ShadingType, PageBreak, LevelFormat, UnderlineType,
        PageNumber, PageOrientation } = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: "1F497D" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri", color: "2E75B6" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Calibri", color: "44546A" },
        paragraph: { spacing: { before: 120, after: 60 }, outlineLevel: 2 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          },
          {
            level: 1,
            format: LevelFormat.BULLET,
            text: "◦",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } }
          }
        ]
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,
          height: 15840
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // TITLE PAGE
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 360 },
        children: [new TextRun({
          text: "NADRA Smart Queue Management System",
          bold: true,
          size: 36,
          font: "Calibri",
          color: "1F497D"
        })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({
          text: "Semester Project Documentation",
          size: 26,
          font: "Calibri",
          color: "2E75B6",
          italic: true
        })]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 360 },
        children: [new TextRun({
          text: "Project Overview, Requirements, Features, Scope & Validation",
          size: 24,
          font: "Calibri",
          color: "44546A"
        })]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1200, after: 120 },
        children: [new TextRun({
          text: "Master of Software Engineering",
          size: 22,
          font: "Calibri"
        })]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 360 },
        children: [new TextRun({
          text: "Government College University Faisalabad",
          size: 22,
          font: "Calibri"
        })]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1200, after: 80 },
        children: [new TextRun({
          text: `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
          size: 22,
          font: "Calibri"
        })]
      }),

      new PageBreak(),

      // INTRODUCTION & OVERVIEW
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. PROJECT INTRODUCTION & OVERVIEW")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.1 Project Title")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("NADRA Smart Queue Management System (NADRA-SQMS)")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.2 Project Statement")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("The NADRA Smart Queue Management System is an enterprise-grade, real-time queue management and floor operations platform designed for the National Database and Registration Authority (NADRA) of Pakistan. It replaces legacy sequential ticketing systems with a modern, distributed, deterministic scheduler that ensures zero duplicate token generation, prevents double-calling of citizens, and provides real-time transparency to customers, staff operators, and administrators.")]
      }),

      // (file continues...)
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/mnt/user-data/outputs/NADRA_Project_Documentation.docx', buffer);
  console.log('✓ Document created successfully: NADRA_Project_Documentation.docx');
});
```

<!-- End of script.js contents -->
