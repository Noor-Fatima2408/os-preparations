```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, PageBreak, HeadingLevel, WidthType, ShadingType, BorderStyle } = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: "D5E8F0", type: ShadingType.CLEAR };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1F497D" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "1F497D" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 }
      }
    ]
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: "bullet",
        text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // ===== COVER PAGE =====
      new Paragraph({ text: "", spacing: { line: 480 } }),
      new Paragraph({
        text: "SMART QUEUE &amp; TOKEN MANAGEMENT SYSTEM",
        alignment: AlignmentType.CENTER,
        spacing: { line: 240 },
        run: { bold: true, size: 32 }
      }),
      new Paragraph({
        text: "for Small Businesses",
        alignment: AlignmentType.CENTER,
        spacing: { line: 240 },
        run: { size: 28 }
      }),
      new Paragraph({
        text: "",
        spacing: { line: 480 }
      }),
      new Paragraph({
        text: "Complete Project &amp; System Design Documentation",
        alignment: AlignmentType.CENTER,
        spacing: { line: 240 },
        run: { bold: true, size: 26 }
      }),
      new Paragraph({
        text: "",
        spacing: { line: 720 }
      }),
      new Paragraph({
        text: "Team Members:",
        alignment: AlignmentType.CENTER,
        spacing: { line: 120 },
        run: { bold: true, size: 24 }
      }),
      new Paragraph({
        text: "Noor Fatima (242368)",
        alignment: AlignmentType.CENTER,
        spacing: { line: 100 },
        run: { size: 22 }
      }),
      new Paragraph({
        text: "Zaryab Asif (242361)",
        alignment: AlignmentType.CENTER,
        spacing: { line: 480 },
        run: { size: 22 }
      }),
      new Paragraph({
        text: "Semester: 4th Morning (A)",
        alignment: AlignmentType.CENTER,
        spacing: { line: 120 },
        run: { size: 22 }
      }),
      new Paragraph({
        text: "Course: Software Requirements Engineering",
        alignment: AlignmentType.CENTER,
        spacing: { line: 120 },
        run: { size: 22 }
      }),
      new Paragraph({
        text: "Institution: Government College University Faisalabad (GCUF)",
        alignment: AlignmentType.CENTER,
        spacing: { line: 480 },
        run: { size: 22 }
      }),
      new Paragraph({
        text: new Date().toLocaleDateString(),
        alignment: AlignmentType.CENTER,
        run: { size: 22 }
      }),

      new PageBreak(),

      // ===== EXECUTIVE SUMMARY =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Executive Summary")]
      }),
      new Paragraph({
        text: "The Smart Queue &amp; Token Management System is a full-stack web application built to digitize and streamline queue management for small businesses including clinics, salons, repair centers, banks, and service offices. The system was developed using modern technologies: Next.js 16 (React 19) for the frontend, Next.js API routes for the backend, and MySQL database with Prisma ORM for data persistence.",
        spacing: { line: 280 }
      }),
      new Paragraph({
        text: "The implementation demonstrates comprehensive software engineering practices including RESTful API design, JWT-based authentication with bcryptjs password hashing, rate limiting, audit logging, and real-time queue position tracking. The system serves three primary user roles (Customer, Staff, Admin) with role-based access control.",
        spacing: { line: 280 }
      }),
      new Paragraph({
        text: "Key Features:",
        spacing: { line: 120 },
        run: { bold: true }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Digital token generation with automatic token numbering and queue position tracking")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Real-time queue status updates with estimated wait time calculations")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Staff operator interface for calling next tokens and managing service counters")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Admin dashboard with system analytics, reporting, and audit logging")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Customer feedback system with 1-5 star ratings")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("System announcements for service updates and notifications")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Secure authentication with JWT tokens and refresh token rotation")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Rate limiting and DDoS protection on API endpoints")]
      }),

      new PageBreak(),

      // ===== INTRODUCTION =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Introduction")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.1 Problem Statement")]
      }),
      new Paragraph({
        text: "Many small businesses still rely on manual queue management systems or basic solutions that lack real-time visibility. Key challenges include:",
        spacing: { line: 280 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Customers waiting in crowded areas without visibility into their queue position")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No estimated wait time information, leading to customer frustration")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Staff struggling to manage multiple service counters and track customer flow")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Lack of structured data for performance analysis and decision-making")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No audit trail for operational compliance and security")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.2 Project Vision")]
      }),
      new Paragraph({
        text: "To create a modern, efficient queue management system that improves operational efficiency for businesses while enhancing customer experience through transparency, real-time updates, and convenience. The system should be scalable, secure, and maintainable for long-term production use.",
        spacing: { line: 280 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.3 Project Objectives")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Design and implement a full-stack queue management application")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Reduce customer wait time anxiety through real-time position tracking")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Provide staff with intuitive tools for efficient queue management")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Enable administrators to monitor system health and generate reports")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Implement enterprise-grade security with authentication and audit logging")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Demonstrate software engineering best practices in code quality and architecture")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.4 Project Scope")]
      }),

      new Paragraph({
        text: "In Scope:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Customer token generation and queue position tracking")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Service counter management and operator interface")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Admin dashboard with analytics and reporting")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Multi-service support with priority levels")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Customer feedback and rating system")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("System announcements and notifications")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("JWT-based authentication and authorization")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Audit logging for security compliance")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Out of Scope:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("SMS/Email notifications integration")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Payment processing integration")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Mobile native applications (web-only)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Advanced AI/ML analytics")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Multi-branch/enterprise deployment")]
      }),

      new PageBreak(),

      // ===== REQUIREMENTS ANALYSIS =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. Requirements Analysis")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.1 Stakeholder Identification")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 1560, 2340, 3900],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders, width: { size: 1560, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Stakeholder")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 1560, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Role")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 2340, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Needs")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 3900, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Interests")], run: { bold: true } })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Customer")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("End User")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Quick service, transparency")] }),
              new TableCell({ borders, width: { size: 3900, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Improved experience, reduced wait time")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Staff")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Operator")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Easy-to-use tools, clear workflow")] }),
              new TableCell({ borders, width: { size: 3900, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Operational efficiency, less manual work")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Admin")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Manager")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Reports, analytics, control")] }),
              new TableCell({ borders, width: { size: 3900, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Data-driven decision making, compliance")] })
            ]
          })
        ]
      }),

      new Paragraph({ text: "", spacing: { line: 240 } }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.2 Functional Requirements")]
      }),

      new Paragraph({
        text: "Customer Module:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR1: System shall allow customers to register/login with email and password")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR2: System shall generate unique token number upon customer request")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR3: Customer shall select service type when generating token")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR4: System shall display current queue position for waiting tokens")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR5: System shall calculate and display estimated wait time")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR6: System shall allow customers to submit feedback (1-5 rating) after service")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR7: Customer shall be able to view service announcements")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Staff Module:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR8: Staff shall login with email and password")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR9: Staff shall call next token from their assigned queue")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR10: Staff shall mark token as completed after service")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR11: Staff shall mark token as skipped if customer doesn't respond")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR12: Staff shall update their availability status (available/busy/offline)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR13: Staff dashboard shall show real-time queue status for their service")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Admin Module:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR14: Admin shall login with email and password")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR15: Admin shall create, update, delete services")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR16: Admin shall manage service counters")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR17: Admin shall assign staff to services and counters")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR18: Admin shall view real-time queue analytics (total waiting, avg wait time)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR19: Admin shall generate reports (daily/weekly service statistics)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR20: Admin shall view customer feedback and ratings")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR21: Admin shall create and publish system announcements")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("FR22: Admin shall view audit logs of system actions")]
      }),

      new Paragraph({ text: "", spacing: { line: 240 } }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.3 Non-Functional Requirements")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 7020],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders, width: { size: 2340, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Category")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 7020, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Requirement")], run: { bold: true } })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Performance")] }),
              new TableCell({ borders, width: { size: 7020, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("API response time &lt; 500ms, page load &lt; 2 seconds")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Scalability")] }),
              new TableCell({ borders, width: { size: 7020, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Support 500+ concurrent users, handle 1000+ tokens/day")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Security")] }),
              new TableCell({ borders, width: { size: 7020, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("HTTPS only, JWT tokens, bcrypt password hashing, rate limiting")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Availability")] }),
              new TableCell({ borders, width: { size: 7020, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("99% uptime during business hours, automatic backup")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Usability")] }),
              new TableCell({ borders, width: { size: 7020, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Intuitive UI, mobile-responsive, accessible to non-technical users")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Maintainability")] }),
              new TableCell({ borders, width: { size: 7020, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Clean code, documented APIs, modular architecture")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Compliance")] }),
              new TableCell({ borders, width: { size: 7020, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Audit logging, data privacy, secure token management")] })
            ]
          })
        ]
      }),

      new PageBreak(),

      // ===== SYSTEM DESIGN =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. System Design &amp; Architecture")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1 Architecture Overview")]
      }),

      new Paragraph({
        text: "The Smart Queue System follows a modern full-stack architecture with clear separation of concerns:",
        spacing: { line: 280 }
      }),

      new Paragraph({
        text: "Frontend Layer (Next.js React 19):",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Built with React 19 (the latest version), using Next.js 16 for server-side rendering and static generation. TypeScript is used throughout for type safety. Tailwind CSS provides responsive, modern styling. The frontend communicates with the backend via RESTful APIs.",
        spacing: { line: 280 }
      }),

      new Paragraph({
        text: "Backend Layer (Next.js API Routes):",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Next.js API routes handle all business logic. Each endpoint implements proper validation, error handling, and security measures. Rate limiting prevents abuse. JWT tokens manage authentication and authorization. Audit logging tracks all admin actions.",
        spacing: { line: 280 }
      }),

      new Paragraph({
        text: "Data Layer (MySQL + Prisma ORM):",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "MySQL database stores all application data. Prisma ORM provides type-safe database access, automatic migrations, and query optimization. The schema includes 9 entities: Customer, Service, Counter, Staff, Token, Feedback, Notification, RefreshToken, AuditLog, and Announcement.",
        spacing: { line: 280 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.2 Database Schema")]
      }),

      new Paragraph({
        text: "The database consists of 9 interconnected tables:",
        spacing: { line: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Customers: Store customer credentials and profile information")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Services: Define service types with average duration and priority")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Counters: Represent physical service counters with status (active/inactive)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Staff: Store staff members with role (staff/admin) and availability status")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Tokens: Track each generated token with status (waiting/serving/completed/cancelled/skipped)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Feedback: Customer ratings and comments for each completed service")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Notifications: System notifications sent to customers and staff")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("RefreshTokens: Secure token rotation with expiration tracking")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("AuditLogs: Complete audit trail for compliance and security")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Announcements: System-wide announcements with scheduling capability")]
      }),

      new Paragraph({ text: "", spacing: { line: 240 } }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.3 API Endpoints (12 Core Endpoints)")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1560, 2340, 5460],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders, width: { size: 1560, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Method")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 2340, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Endpoint")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 5460, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Description")], run: { bold: true } })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("POST")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/auth")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Register/Login/Logout with email &amp; password")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("GET")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/auth/profile")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Get current user profile (JWT protected)")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("POST")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/tokens")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Generate new token for customer")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("GET")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/tokens")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Get token details &amp; queue position")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("POST")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/tokens/call-next")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Staff calls next token from queue")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("GET")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/services")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("List all available services")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("POST")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/feedback")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Submit customer feedback &amp; rating")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("GET")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/reports")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Generate admin reports &amp; analytics")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("GET")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/announcements")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Get system announcements")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("GET")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("/api/staff")] }),
              new TableCell({ borders, width: { size: 5460, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Admin: Manage staff members")] })
            ]
          })
        ]
      }),

      new PageBreak(),

      // ===== IMPLEMENTATION =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. Implementation Details")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1 Technology Stack")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 2340, 1560, 3120],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders, width: { size: 2340, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Layer")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 2340, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Technology")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 1560, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Version")], run: { bold: true } })]
              }),
              new TableCell({
                borders, width: { size: 3120, type: WidthType.DXA },
                shading: headerShading, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun("Purpose")], run: { bold: true } })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Frontend")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("React")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("19.2.4")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("UI framework")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Frontend")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Next.js")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("16.2.6")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("SSR &amp; API framework")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Frontend")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("TypeScript")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("5.x")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Type safety")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Styling")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Tailwind CSS")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("3.4.19")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Responsive design")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Backend")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Next.js API Routes")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("16.2.6")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("API server")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Database")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("MySQL")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("8.0")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Data storage")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Database")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Prisma ORM")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("5.10.0")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Type-safe DB access")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Security")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("jsonwebtoken")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("9.0.3")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("JWT authentication")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Security")] }),
              new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("bcryptjs")] }),
              new TableCell({ borders, width: { size: 1560, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("3.0.3")] }),
              new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph("Password hashing")] })
            ]
          })
        ]
      }),

      new Paragraph({ text: "", spacing: { line: 240 } }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2 Security Implementation")]
      }),

      new Paragraph({
        text: "Authentication:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("JWT tokens issued on login, with 15-minute expiration")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Refresh tokens stored securely for token rotation")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Passwords hashed with bcryptjs (10 salt rounds minimum)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Email normalized to prevent duplicate accounts")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Authorization:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Role-based access control (Customer, Staff, Admin)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Protected endpoints require valid JWT token")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("User can only access their own data (customers see own tokens/feedback)")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Rate Limiting:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("5 registration attempts per 30 minutes per IP")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Login rate limiting to prevent brute force attacks")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("API-wide rate limiting on all endpoints")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Audit Logging:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Every admin action logged with actor ID, action type, and timestamp")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("IP address and user agent recorded for security investigation")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Full audit trail accessible to administrators")]
      }),

      new PageBreak(),

      // ===== ACTUAL IMPLEMENTATION =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. Actual Implementation Status")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.1 Project Structure")]
      }),

      new Paragraph({
        text: "Repository: https://github.com/noor202401938-netizen/smart-queue-management",
        spacing: { line: 280 }
      }),

      new Paragraph({
        text: "The project is organized with the following structure:",
        spacing: { line: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/smart-queue - Main Next.js application")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/src/app - Next.js pages and API routes")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/src/app/api - RESTful API endpoints")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/src/app/customer - Customer dashboard page")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/src/app/staff - Staff operator interface")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/src/app/admin - Admin dashboard page")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/prisma - Database schema and migrations")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("/public - Static assets")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.2 Database Tables Implemented")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Customer - 5 fields (customer_id, name, phone_number, email, password, created_at)")] 
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Service - 4 fields (service_id, service_name, avg_duration, priority_level)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Counter - 3 fields (counter_id, counter_number, status)")] 
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Staff - 6 fields (staff_id, name, email, password, role, availability, service_id)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Token - 8 fields (token_id, token_number, issue_time, status, customer_id, service_id, counter_id)")] 
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Feedback - 4 fields (feedback_id, rating, comments, created_at, token_id)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Notification - 5 fields (notification_id, message, is_read, created_at, token_id)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ RefreshToken - 5 fields (refresh_token_id, token_hash, user_id, role, expires_at, revoked_at)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ AuditLog - 8 fields (audit_log_id, actor_id, actor_role, action, entity_type, entity_id, ip_address, created_at)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Announcement - 6 fields (announcement_id, title, message, status, starts_at, ends_at, created_at)")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.3 API Routes Implemented")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/auth - Register, login, logout, password hashing, token generation")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/auth/refresh - Token refresh for session management")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/auth/profile - Get current user profile")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/tokens - Generate token, get token status, list user tokens")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/tokens/call-next - Staff calls next token, updates queue")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/services - List services with average duration")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/counters - Get counter status")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/feedback - Submit customer feedback and ratings")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/notifications - Get user notifications")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/staff - Admin manages staff members")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/reports - Generate admin reports")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ /api/announcements - Get system announcements")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.4 Key Features Implemented")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Real-time queue position calculation based on token issue_time")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Automatic token numbering with retry mechanism")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Estimated wait time calculation from service avg_duration")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Token status workflow (waiting → serving → completed/cancelled/skipped)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Staff availability status (available/busy/offline)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Rate limiting on authentication endpoints")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Comprehensive audit logging for all admin actions")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("✓ Secure password handling with bcrypt")]
      }),

      new PageBreak(),

      // ===== TESTING &amp; DEPLOYMENT =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. Testing &amp; Quality Assurance")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.1 Testing Strategy")]
      }),

      new Paragraph({
        text: "Unit Testing:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Token generation and numbering logic")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Queue position calculation")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Wait time estimation")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Authentication and password hashing")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "Integration Testing:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("API endpoint testing with sample data")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Database operations (CRUD on all entities)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Authentication flow (register → login → access protected routes)")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Queue workflow (token generation → calling → completion)")]
      }),

      new Paragraph({
        text: "",
        spacing: { line: 120 }
      }),
      new Paragraph({
        text: "System Testing:",
        run: { bold: true },
        spacing: { line: 120 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("End-to-end customer journey")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Multi-user concurrency scenarios")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Error handling and edge cases")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Performance under load")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.2 Code Quality")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("TypeScript for type safety throughout")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("ESLint configuration for consistent code style")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Input validation on all API endpoints")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Error handling with meaningful HTTP status codes")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Database query optimization with indexes")] })
      }),

      new PageBreak(),

      // ===== DEPLOYMENT &amp; CONCLUSION =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("7. Deployment &amp; Maintenance")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.1 Deployment Architecture")]
      }),

      new Paragraph({
        text: "The application can be deployed on any Node.js hosting platform:",
        spacing: { line: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Vercel (recommended for Next.js - 1-click deployment)")] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/Smart_Queue_Project_Document.docx", buffer);
  console.log("✅ Project Document created successfully!");
});
```

```bash
node /home/claude/create_project_document.js
# Output
✅ Project Document created successfully!
```
