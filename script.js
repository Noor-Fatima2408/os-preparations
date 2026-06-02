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

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("The system processes thousands of citizen registrations daily across high-concurrency multi-counter environments, handling CNIC updates, passport issuance, and child registration services with automatic load balancing, self-healing resilience, and mathematical fairness through priority-aging scheduling.")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.3 Target Stakeholders")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Citizens/Customers:",
          bold: true
        }), new TextRun(" End users requesting services, monitoring queue position, and receiving real-time updates")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Staff Operators:",
          bold: true
        }), new TextRun(" Counter agents processing transactions, calling customers, and updating counter availability")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({
          text: "System Administrators:",
          bold: true
        }), new TextRun(" Center managers configuring services, managing staff, publishing announcements, and reviewing audit logs")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.4 Key Business Goals")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Zero sequence duplication through transactional token generation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Eliminate double-calling via row-level locking mechanisms")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Sub-second real-time UI synchronization using Server-Sent Events")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Mathematically bounded wait times with priority-aging schedulers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun("Self-healing resilience with automatic counter release on session disconnects")]
      }),

      new PageBreak(),

      // SYSTEM REQUIREMENTS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. SYSTEM REQUIREMENTS")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.1 Functional Requirements")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Token Generation & Management")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Generate unique daily sequential token numbers with guaranteed atomicity")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Prevent duplicate sequence IDs under concurrent rapid requests")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Support token cancellation and re-activation by citizens")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Track token lifecycle: waiting → serving → skipped/completed")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Queue Scheduling & Call Next")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Implement priority-aging algorithm to prevent service starvation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Call next customer without race conditions or double-calling")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Assign tickets to available counters with transactional safety")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Auto-skip absent customers and move to next in queue")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Real-Time Notifications & Streaming")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Broadcast queue updates to public TV displays via SSE")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Send native Web Push notifications to customers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Notify operators instantly when their counter is assigned a customer")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Provide wait time estimates with accuracy ± 5 minutes")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Administration & Configuration")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Create, update, delete service types (e.g., General, Executive, Passport)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Configure physical counter terminals with unique identifiers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Manage staff profiles, roles, availability, and counter assignments")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Publish announcements visible on lobby displays")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Export audit logs and analytics reports")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.2 Non-Functional Requirements")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Performance")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Support ≥ 1000 concurrent connections per center")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Token generation latency ≤ 500 ms under peak load")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Queue update SSE propagation ≤ 1 second")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Reliability & Availability")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("System availability target: 99.5% uptime")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Automatic recovery from database connection failures")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Graceful degradation when push notification service is unavailable")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Security")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Enforce role-based access control (RBAC) for all endpoints")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Use secure httpOnly cookies for JWT token storage")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Implement rate limiting to prevent abuse")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Mask sensitive PII in customer notifications")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Scalability")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Horizontal scaling via stateless API servers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Database connection pooling for high-concurrency scenarios")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun("Support growth from 5 to 50+ counters per facility")]
      }),

      new PageBreak(),

      // FEATURES & CAPABILITIES
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. SYSTEM FEATURES & CAPABILITIES")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1 Customer Portal Features")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Service Discovery:",
          bold: true
        }), new TextRun(" Browse available services with descriptions and average processing times")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Token Generation:",
          bold: true
        }), new TextRun(" Request a queue token from self-service kiosk or mobile app")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Real-Time Queue Status:",
          bold: true
        }), new TextRun(" View current position, estimated wait time, and next 3 customers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Push Notifications:",
          bold: true
        }), new TextRun(" Receive native OS alerts when it's their turn")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Ticket Management:",
          bold: true
        }), new TextRun(" Cancel waiting token or view history of past transactions")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({
          text: "Service Feedback:",
          bold: true
        }), new TextRun(" Rate experience and submit comments after completion")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.2 Operator Console Features")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Counter Assignment:",
          bold: true
        }), new TextRun(" Select active counter desk at login")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Call Next Citizen:",
          bold: true
        }), new TextRun(" One-click button to call highest-priority waiting customer")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Active Ticket Details:",
          bold: true
        }), new TextRun(" Display serving customer name, service type, estimated duration")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Transaction Status:",
          bold: true
        }), new TextRun(" Mark ticket as completed or skipped (customer absent)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Availability Toggle:",
          bold: true
        }), new TextRun(" Update status to busy/available/on-break")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({
          text: "Queue Insight:",
          bold: true
        }), new TextRun(" View pending queue list and next waiting customers")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.3 Administrator Dashboard")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Real-Time Floor Overview:",
          bold: true
        }), new TextRun(" Monitor all active counters, operators, and current queue status")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Service Management:",
          bold: true
        }), new TextRun(" Create, edit, disable service types with priority levels")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Counter Configuration:",
          bold: true
        }), new TextRun(" Add, remove, or modify counter terminals")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Staff Management:",
          bold: true
        }), new TextRun(" Create operator accounts, assign roles, manage availability")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Announcements Board:",
          bold: true
        }), new TextRun(" Publish time-scheduled messages visible on lobby TVs")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Analytics & Reporting:",
          bold: true
        }), new TextRun(" Export daily/weekly metrics: average wait times, throughput, service times")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun({
          text: "Audit Logging:",
          bold: true
        }), new TextRun(" Detailed logs of all operator actions with timestamps")]
      }),

      new PageBreak(),

      // PROJECT SCOPE
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. PROJECT SCOPE")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1 What is Included")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Core queue management system with token generation and scheduling")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Three user-facing portals: Customer, Operator, Administrator")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Real-time data synchronization via Server-Sent Events")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Web Push notification system for customer alerts")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("JWT-based authentication with refresh token rotation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Comprehensive audit logging and activity tracking")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Automated testing suites for concurrency and transaction safety")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("PWA support with offline fallback capabilities")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2 What is Explicitly Excluded")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("SMS integration (out of scope; Web Push only)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Multi-language support (English interface only)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Advanced financial reporting and billings modules")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Integration with external HR or payroll systems")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun("On-site maintenance or field support")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.3 Technology Stack")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Frontend:",
          bold: true
        }), new TextRun(" React 19, Next.js 16 (App Router), TypeScript")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Styling:",
          bold: true
        }), new TextRun(" Tailwind CSS, HSL palette customization, Glassmorphism")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Backend:",
          bold: true
        }), new TextRun(" Node.js 20, Next.js API routes")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Database:",
          bold: true
        }), new TextRun(" MySQL 8.0 with Prisma ORM 5.10")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Real-Time:",
          bold: true
        }), new TextRun(" Server-Sent Events (SSE), Web Push API")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "Testing:",
          bold: true
        }), new TextRun(" Vitest 4.0 with concurrent testing utilities")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun({
          text: "Deployment:",
          bold: true
        }), new TextRun(" Vercel, AWS EC2, or Docker-based environments")]
      }),

      new PageBreak(),

      // VERIFICATION & VALIDATION
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. VERIFICATION & VALIDATION")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.1 Verification (Building the System Right)")]
      }),

      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({
          text: "Verification ensures that the system is built according to design specifications and architectural blueprints.",
          italic: true
        })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Code Reviews")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Enforce peer review on all TypeScript components")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Check adherence to linting rules (ESLint) and formatting (Prettier)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Verify transaction isolation levels in database operations")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Unit Testing")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Vitest suite with ≥ 85% code coverage")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Isolated testing of utility functions: token validators, rate limiters, input parsers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Mock Prisma queries to verify database transaction behavior")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Test edge cases: empty queues, invalid inputs, expired tokens")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Integration Testing")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("End-to-end API path verification: token generation → call next → mark complete")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Test concurrent calls to critical paths using Promise.allSettled()")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Verify SSE broadcast mechanics with simulated multiple clients")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Database deadlock detection and transaction rollback scenarios")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Database Schema Validation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Verify Prisma schema migrations without data loss")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Ensure index structure matches performance targets")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Test foreign key constraints and referential integrity")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Validate compound index usage for token lookups")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.2 Validation (Building the Right System)")]
      }),

      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({
          text: "Validation ensures that the finished system meets actual user needs and business requirements.",
          italic: true
        })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Functional Acceptance Testing")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Citizens can generate tokens and view queue position correctly")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Operators call next customer and system prevents double-calling")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Administrators create services, counters, and staff without errors")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Push notifications arrive within ≤ 3 seconds of trigger event")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Load & Stress Testing")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Simulate 1000+ concurrent users requesting tokens")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Verify database handles 500+ tokens/second without dropping")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Test SSE propagation with 100+ connected lobby displays")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Monitor memory usage and connection pooling stability")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("User Acceptance Testing (UAT)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Pilot deployment at one NADRA center with 100+ staff and customers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Gather feedback on UI intuitiveness and workflow efficiency")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Measure actual queue times vs. estimated times")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Collect satisfaction ratings from customers and operators")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Security & Compliance")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Penetration testing for OWASP Top 10 vulnerabilities")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Verify PII encryption and secure storage of customer phone/email")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Audit JWT token refresh logic and session expiry")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Test rate limiting effectiveness against brute-force attacks")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun("Verify audit logs capture all administrative actions")]
      }),

      new PageBreak(),

      // DATABASE MODELS & CLASS DIAGRAMS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. DATABASE MODELS & CLASS DIAGRAMS")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.1 Entity Relationship Model")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("The system maintains nine core entities with the following relationships:")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1500, 2800, 5060],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders,
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: "Entity", bold: true, color: "FFFFFF" })] })]
              }),
              new TableCell({
                borders,
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: "Primary Purpose", bold: true, color: "FFFFFF" })] })]
              }),
              new TableCell({
                borders,
                shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: "Key Relationships", bold: true, color: "FFFFFF" })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("customers")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Store citizen profiles and credentials")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("1-to-many: tokens, push_subscriptions")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("services")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Define service categories (General, Executive, etc.)")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("1-to-many: tokens, staff")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("counters")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Physical counter terminals")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("1-to-many: tokens")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("staff")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Operator and admin user accounts")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("FK: services, many-to-one notifications")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("tokens")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Queue tickets with status lifecycle")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("FK: customers, services, counters; 1-to-1: feedback")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("feedback")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Customer satisfaction ratings")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("1-to-1: tokens")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("notifications")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Alert messages for users")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("FK: tokens, customers, staff")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("audit_logs")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Activity tracking for compliance")] })]
              }),
              new TableCell({
                borders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("actor_id, entity_id, action, metadata")] })]
              })
            ]
          })
        ]
      }),

      new Paragraph({
        spacing: { before: 240, after: 360 },
        children: [new TextRun("")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.2 Core Application Services")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("The system is organized into reusable service modules that encapsulate business logic:")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Authentication & Authorization")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "TokenValidator:",
          bold: true
        }), new TextRun(" Signs and verifies JWT access tokens with HS256 algorithm")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "SessionManager:",
          bold: true
        }), new TextRun(" Manages refresh token lifecycle with secure httpOnly cookies")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({
          text: "RoleBasedAccessControl:",
          bold: true
        }), new TextRun(" Enforces role permissions (citizen, operator, admin) on API endpoints")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Input Validation & Sanitization")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "InputValidator:",
          bold: true
        }), new TextRun(" Parses and validates request JSON (required strings, positive ints, enums)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({
          text: "EmailNormalizer:",
          bold: true
        }), new TextRun(" Lowercase and trim email addresses for consistent lookups")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Real-Time Streaming")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "SSEBroadcaster:",
          bold: true
        }), new TextRun(" Maintains persistent stream connections to broadcast queue updates")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({
          text: "WebPushDispatcher:",
          bold: true
        }), new TextRun(" Sends native push notifications via Web Push API gateways")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Database & ORM")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "PrismaClient:",
          bold: true
        }), new TextRun(" Singleton instance for type-safe database operations")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({
          text: "TransactionManager:",
          bold: true
        }), new TextRun(" Wraps Prisma transactions with deadlock retry logic")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Logging & Monitoring")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "AuditLogger:",
          bold: true
        }), new TextRun(" Records detailed activity logs with actor, action, entity, and metadata")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({
          text: "ErrorHandler:",
          bold: true
        }), new TextRun(" Converts application exceptions into client-safe HTTP responses")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun({
          text: "RateLimiter:",
          bold: true
        }), new TextRun(" Throttles API requests per user/IP with configurable window sizes")]
      }),

      new PageBreak(),

      // SYSTEM ARCHITECTURE SUMMARY
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("7. SYSTEM ARCHITECTURE SUMMARY")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.1 Architecture Overview")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("NADRA-SQMS follows a modern three-tier microservices-friendly architecture:")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Presentation Layer")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("React 19 components rendered server-side via Next.js 16")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Responsive UI with Tailwind CSS and Glassmorphism design")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("PWA manifest for offline support and installability")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("API Layer")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("RESTful endpoints with JSON request/response serialization")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Middleware stack: authentication, validation, rate limiting")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Server-Sent Events streams for real-time queue broadcasts")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Webhook hooks for background notifications and cleanup tasks")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Data Layer")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("MySQL 8.0 with Prisma ORM for type-safe queries")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Compound indexes optimized for token lookups and queue searches")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun("Transaction isolation (ReadCommitted) to prevent concurrent conflicts")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.2 Deployment Architecture")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("Production deployment uses containerized services with load balancing:")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Docker containers for Next.js API server (stateless)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Kubernetes or AWS ECS for orchestration and auto-scaling")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("CloudFront CDN for static assets (CSS, JS, images)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Managed MySQL database with automated backups")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Redis cache (optional) for session storage and rate limit counts")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun("CloudWatch logs for centralized monitoring and alerting")]
      }),

      new PageBreak(),

      // IMPLEMENTATION STATUS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("8. IMPLEMENTATION STATUS")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.1 Fully Completed Modules")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Prisma schema with MySQL indexes and relationship definitions")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Transactional token generation with SELECT FOR UPDATE locking")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Call Next scheduler with row-level isolation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Real-time SSE streaming for public queue displays")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("JWT authentication with httpOnly cookie support")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Multi-threaded Vitest suites for concurrency testing")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("PWA configuration with service worker manifest")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.2 In Progress / Partially Complete")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Announcements board data model — schema ready; admin UI being finalized")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Custom rate-limiting middleware store — basic Redis/in-memory implemented; optimization pending")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun("Analytics dashboard — data aggregation queries written; visualization pending")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.3 Future Enhancements")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Multi-language localization (Urdu, Pashto, etc.)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("SMS integration for low-bandwidth environments")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Advanced reporting and business intelligence dashboards")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Mobile app (React Native or Flutter)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 360 },
        children: [new TextRun("Integration with NADRA's existing CNIC/biometric databases")]
      }),

      new PageBreak(),

      // CONCLUSION
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("9. CONCLUSION")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("The NADRA Smart Queue Management System represents a comprehensive, production-ready solution to critical operational challenges faced by Pakistan's premier citizen registration authority. By leveraging modern distributed systems engineering patterns — transactional isolation, lock-free algorithms, real-time streaming, and automated resilience — the system delivers a platform that is simultaneously scalable, fair, transparent, and resilient to the high-concurrency, mission-critical demands of a national service center.")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("This documentation package provides all technical stakeholders — developers, architects, administrators, and QA teams — with the architectural blueprints, functional specifications, test strategies, and compliance measures necessary to successfully deploy, operate, and maintain the system in production environments serving thousands of citizens daily.")]
      }),

      new Paragraph({
        spacing: { after: 0 },
        children: [new TextRun("The system is ready for beta deployment, comprehensive user acceptance testing, and eventual full rollout across NADRA facilities.")]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/mnt/user-data/outputs/NADRA_Project_Documentation.docx', buffer);
  console.log('✓ Document created successfully: NADRA_Project_Documentation.docx');
});