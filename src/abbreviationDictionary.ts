// =====================
// 1️⃣ 네트워크 / 웹
// =====================
const networkAbbr = new Set([
  "HTTP",   // HyperText Transfer Protocol
  "HTTPS",  // HTTP Secure
  "URL",    // Uniform Resource Locator
  "URI",    // Uniform Resource Identifier
  "FTP",    // File Transfer Protocol
  "SMTP",   // Simple Mail Transfer Protocol
  "DNS",    // Domain Name System
  "IP",     // Internet Protocol
  "TCP",    // Transmission Control Protocol
  "UDP",    // User Datagram Protocol
  "SSH",    // Secure Shell
  "REST",   // Representational State Transfer
  "SOAP",   // Simple Object Access Protocol
  "JSON",   // JavaScript Object Notation
  "XML",    // eXtensible Markup Language
  "CDN",    // Content Delivery Network
  "MQTT",   // Message Queuing Telemetry Transport
]);

// =====================
// 2️⃣ 데이터베이스 / 데이터
// =====================
const dbAbbr = new Set([
  "SQL",    // Structured Query Language
  "DB",     // DataBase
  "DDL",    // Data Definition Language
  "DML",    // Data Manipulation Language
  "DCL",    // Data Control Language
  "ETL",    // Extract Transform Load
  "CSV",    // Comma-Separated Values
  "ORM",    // Object-Relational Mapping
  "NoSQL",  // Not Only SQL
]);

// =====================
// 3️⃣ 개발 / 소프트웨어
// =====================
const devAbbr = new Set([
  "API",    // Application Programming Interface
  "SDK",    // Software Development Kit
  "IDE",    // Integrated Development Environment
  "OOP",    // Object-Oriented Programming
  "FP",     // Functional Programming
  "GUI",    // Graphical User Interface
  "CLI",    // Command Line Interface
  "MVC",    // Model-View-Controller
  "MVVM",   // Model-View-ViewModel
  "TDD",    // Test-Driven Development
  "BDD",    // Behavior-Driven Development
  "CI",     // Continuous Integration
  "CD",     // Continuous Delivery / Deployment
  "VCS",    // Version Control System
  "Git",    // Git
]);

// =====================
// 4️⃣ 보안 / 암호화
// =====================
const securityAbbr = new Set([
  "AES",    // Advanced Encryption Standard
  "RSA",    // Rivest–Shamir–Adleman
  "TLS",    // Transport Layer Security
  "SSL",    // Secure Sockets Layer
  "JWT",    // JSON Web Token
  "PKI",    // Public Key Infrastructure
  "HMAC",   // Hash-based Message Authentication Code
]);

// =====================
// 5️⃣ 클라우드 / 인프라
// =====================
const cloudAbbr = new Set([
  "AWS",    // Amazon Web Services
  "GCP",    // Google Cloud Platform
  "IaaS",   // Infrastructure as a Service
  "PaaS",   // Platform as a Service
  "SaaS",   // Software as a Service
  "K8s",    // Kubernetes
  "VM",     // Virtual Machine
  "CICD",  // Continuous Integration / Continuous Deployment
]);

// =====================
// 6️⃣ 통합 Set (중복 체크)
// =====================
export function mergeAbbrSets(...sets: Set<string>[]) {
  const merged = new Set<string>();
  for (const s of sets) {
    for (const item of s) {
      if (merged.has(item)) {
        throw new Error(`중복된 약어 발견: ${item}`);
      }
      merged.add(item);
    }
  }
  return merged;
}

// =====================
// 7️⃣ 사용 예시
// =====================
export const abbreviationDictionary = mergeAbbrSets(
  networkAbbr,
  dbAbbr,
  devAbbr,
  securityAbbr,
  cloudAbbr
);

