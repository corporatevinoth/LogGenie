# 🚀 Copilot Task: AI-Powered Critical Error Analysis & RCA Generation System

## 📋 Project Overview

Build an **automated error analysis and RCA (Root Cause Analysis) generation system** that:
- ✅ Monitors critical errors in application logs (ERROR, FATAL, timeout levels)
- ✅ Analyzes errors using **open-source LLMs** (hosted in cloud, NOT local deployment)
- ✅ Generates actionable recommendations and code fixes
- ✅ Creates RCA documents with findings and remediation steps
- ✅ Exports analysis results as PDF/markdown documents

This is a **new POC project** that extends log analysis with AI-powered intelligent error diagnosis.

---

## 🏗️ Architecture

### System Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  React Frontend (Browser)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  1. Log Input: Paste/Upload raw logs               │   │
│  │  2. Log Parser: Extract entries                    │   │
│  │  3. Flow Visualization: Service interactions       │   │
│  │  4. Dashboard: Metrics & health indicators         │   │
│  │  5. [NEW] AI Analyzer Panel                        │   │
│  │     - Detects CRITICAL/ERROR/FATAL levels         │   │
│  │     - "Analyze with AI" button                      │   │
│  │     - Displays: Root Cause, Suggested Fix, RCA    │   │
│  └──────────────────────────────────────────────────────┘   │
│              ↓ POST /api/analyze-error ↓                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              Node.js Express Backend Server                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes:                                         │   │
│  │  POST /api/analyze-error                            │   │
│  │  POST /api/generate-rca                             │   │
│  │  GET  /api/analysis-history (optional)              │   │
│  │                                                      │   │
│  │  Services:                                           │   │
│  │  - Error Analyzer (parse & structure)               │   │
│  │  - LLM Provider (call hosted models)                │   │
│  │  - RCA Generator (create documents)                 │   │
│  │  - PDF Exporter (generate downloadable docs)        │   │
│  └──────────────────────────────────────────────────────┘   │
│              ↓ API calls (with auth) ↓                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│      Open-Source LLM Hosted Services (No Local Deploy)      │
│                                                              │
│  PRIMARY: Replicate API                                     │
│  - Model: Llama 2 70B / Mistral 7B / CodeLlama             │
│  - Endpoint: https://api.replicate.com/v1/predictions      │
│  - Auth: REPLICATE_API_TOKEN                               │
│                                                              │
│  FALLBACK: Hugging Face Inference API                       │
│  - Model: meta-llama/Llama-2-70b-hf                        │
│  - Endpoint: https://api-inference.huggingface.co          │
│  - Auth: HF_API_TOKEN (free tier available)                │
│                                                              │
│  ALTERNATIVE: Together AI                                   │
│  - Model: meta-llama/Llama-2-70b-chat-hf                   │
│  - Endpoint: https://api.together.xyz/v1/completions      │
│  - Auth: TOGETHER_API_KEY (cheapest option)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
.
├── src/                              # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── Layout.tsx               # Three-panel layout
│   │   ├── InputPanel.tsx            # Log input textarea + upload
│   │   ├── Dashboard.tsx             # Metrics & analytics
│   │   ├── Flow/
│   │   │   └── FlowCanvas.tsx       # React Flow visualization
│   │   └── AIAnalyzer.tsx            # ✨ NEW: AI error analysis panel
│   ├── utils/
│   │   ├── logParser.ts             # Parse JSON/text logs
│   │   └── aiClient.ts              # ✨ NEW: Call backend API
│   ├── types.ts                     # TypeScript interfaces
│   ├── App.tsx                      # Main app component
│   └── main.tsx
│
├── backend/                          # ✨ NEW: Express server
│   ├── src/
│   │   ├── server.ts                # Express app setup
│   │   ├── routes/
│   │   │   ├── errorAnalysis.ts     # POST /api/analyze-error
│   │   │   └── rcaDocument.ts       # POST /api/generate-rca
│   │   ├── services/
│   │   │   ├── llmProvider.ts       # LLM API integration
│   │   │   ├── errorAnalyzer.ts     # Error parsing & structuring
│   │   │   ├── rcaGenerator.ts      # RCA document generation
│   │   │   └── pdfExporter.ts       # PDF generation
│   │   ├── middleware/
│   │   │   ├── auth.ts              # API key validation
│   │   │   └── errorHandler.ts      # Error handling
│   │   ├── utils/
│   │   │   └── prompts.ts           # LLM prompt templates
│   │   └── types.ts
│   ├── .env.example                 # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                             # Documentation
│   ├── AI_INTEGRATION.md            # How AI analysis works
│   ├── DEPLOYMENT.md                # Deploy frontend & backend
│   ├── LLM_PROVIDERS.md             # Comparison of LLM options
│   │   └── API_REFERENCE.md         # Backend API endpoints
│   └── API_REFERENCE.md             # Backend API endpoints
│   └── API_REFERENCE.md             # Backend API endpoints
│   └── API_REFERENCE.md             # Backend API endpoints
│   └── API_REFERENCE.md             # Backend API endpoints
│   #
│   
├── .github/workflows/
│   └── deploy.yml                   # CI/CD pipeline
│
├── vite.config.ts
├── tsconfig.json
├── package.json                     # Frontend dependencies
├── postcss.config.js
├── tailwind.config.js
└── README.md                        # Updated with new features
```

---

## 🎯 Feature Requirements

### Phase 1: Core Error Detection & Analysis

#### 1.1 Backend Setup
- [ ] Initialize Node.js + Express server in `backend/` folder
- [ ] Setup TypeScript with proper `tsconfig.json`
- [ ] Create `.env.example` with required API keys:
  ```env
  # Choose ONE LLM provider
  REPLICATE_API_TOKEN=your_token_here
  # OR
  HF_API_TOKEN=your_token_here
  # OR
  TOGETHER_API_KEY=your_key_here
  
  # Server config
  PORT=5000
  NODE_ENV=development
  CORS_ORIGIN=http://localhost:5173
  ```

#### 1.2 LLM Provider Integration (`backend/src/services/llmProvider.ts`)
Create an abstraction layer that supports **multiple LLM providers**:

**Interface:**
```typescript
interface LLMAnalysis {
  rootCause: string;
  suggestedFix: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  affectedServices: string[];
  recommendedActions: string[];
}

interface LLMProvider {
  analyzeError(prompt: string): Promise<LLMAnalysis>;
  isHealthy(): Promise<boolean>;
}
```

**Implementations:**
- **ReplicateProvider**: Call Llama 2 70B via Replicate API
  - Endpoint: `POST https://api.replicate.com/v1/predictions`
  - Model: `replicate/llama-2-70b-chat:2796214f78469c37f5636f21b7d02224a606cb888f5c1e0e82b330577481b008`
  - Async polling for results (webhook optional)

- **HuggingFaceProvider**: Call HF Inference API
  - Endpoint: `POST https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-hf`
  - Model: `meta-llama/Llama-2-70b-hf`
  - Simpler sync API

- **TogetherAIProvider**: Call Together AI API
  - Endpoint: `POST https://api.together.xyz/v1/completions`
  - Model: `meta-llama/Llama-2-70b-chat-hf`
  - Most cost-efficient

**Logic:**
```typescript
// Prioritize providers, fallback if one is down
const providers = [new ReplicateProvider(), new HuggingFaceProvider()];
for (const provider of providers) {
  if (await provider.isHealthy()) {
    return await provider.analyzeError(prompt);
  }
}
throw new Error('All LLM providers unavailable');
```

#### 1.3 Error Analyzer (`backend/src/services/errorAnalyzer.ts`)
- Parse incoming error log with context
- Extract:
  - Error message
  - Service name
  - Timestamp
  - Stack trace (if available)
  - Related logs (context window: ±5 logs)
  - Status code / error level
- Prepare structured context for LLM

#### 1.4 LLM Prompt Template (`backend/src/utils/prompts.ts`)
Create a **system prompt** for error analysis:

```typescript
export const ERROR_ANALYSIS_PROMPT = (errorContext: ErrorContext) => `
You are an expert DevOps engineer and software architect analyzing critical system errors.

## Critical Error Report

### Error Details:
- Service: ${errorContext.service}
- Level: ${errorContext.level}
- Timestamp: ${errorContext.timestamp}
- Message: ${errorContext.message}

### Stack Trace:
\`\`\`
${errorContext.stackTrace || 'N/A'}
\`\`\`

### Related Logs (Context):
${errorContext.contextLogs.map(log => \`- [\${log.time}] \${log.service}: \${log.message}\`).join('\n')}

## Analysis Request

Provide a structured analysis with:

1. **Root Cause Analysis**: What likely caused this error? Consider service dependencies, timeout patterns, resource exhaustion.

2. **Severity Assessment**: Rate as CRITICAL/HIGH/MEDIUM with justification.

3. **Affected Services**: List any dependent services that might be impacted.

4. **Suggested Code Fix**: Provide a code snippet showing how to fix this in the affected service.

5. **Recommended Actions**: List immediate actions (restart service, scale up, increase timeout, etc).

6. **Prevention**: How to prevent this in the future?

## Response Format (MUST be valid JSON):
\`\`\`json
{
  "rootCause": "string",
  "suggestedFix": "code snippet as string",
  "severity": "CRITICAL|HIGH|MEDIUM",
  "affectedServices": ["service1", "service2"],
  "recommendedActions": ["action1", "action2"],
  "prevention": "string"
}
\`\`\`
`;
```

#### 1.5 API Routes (`backend/src/routes/errorAnalysis.ts`)

**Endpoint 1: Analyze Error**
```typescript
POST /api/analyze-error
Content-Type: application/json

Request Body:
{
  "errorLog": {
    "timestamp": "2024-01-15T10:30:00Z",
    "service": "PaymentService",
    "level": "ERROR",
    "message": "Database connection timeout after 5000ms",
    "stackTrace": "...",
    "statusCode": 504
  },
  "contextLogs": [
    { "time": "10:29:59", "service": "PaymentService", "message": "Connecting to DB..." },
    { "time": "10:30:00", "service": "DatabaseCluster", "message": "High CPU: 95%" }
  ]
}

Response (200 OK):
{
  "success": true,
  "analysis": {
    "rootCause": "Database connection pool exhaustion due to slow queries...",
    "suggestedFix": "// Implement connection pooling with timeout handling...",
    "severity": "CRITICAL",
    "affectedServices": ["PaymentService", "OrderService"],
    "recommendedActions": ["Restart database", "Scale connection pool", "Check query performance"],
    "prevention": "Implement circuit breaker pattern..."
  },
  "processingTime": 8500 // milliseconds
}

Response (400 Bad Request / 429 Too Many Requests / 503 Service Unavailable):
{
  "success": false,
  "error": "LLM service unavailable, please retry",
  "code": "SERVICE_UNAVAILABLE"
}
```

#### 1.6 Frontend AI Analyzer Component (`src/components/AIAnalyzer.tsx`)

```typescript
// Core features:
- Display list of CRITICAL/ERROR/FATAL logs
- "Analyze with AI" button
- Loading state with spinner
- Results display:
  - Root Cause (expandable)
  - Suggested Fix (code block with copy button)
  - Severity badge (red/orange/yellow)
  - Affected Services
  - Recommended Actions (list)
- Download RCA as PDF/Markdown
- Error handling & retry logic
```

**Example Component Structure:**
```tsx
<div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
  <div className="flex items-center space-x-2 mb-4">
    <AlertTriangle className="text-red-400" />
    <h3 className="font-bold text-red-400">AI Error Analysis</h3>
  </div>
  
  {!analysis ? (
    <button onClick={handleAnalyze} disabled={loading}>
      {loading ? 'Analyzing...' : 'Analyze with AI'}
    </button>
  ) : (
    <div className="space-y-4">
      <SeverityBadge severity={analysis.severity} />
      <RootCauseSection cause={analysis.rootCause} />
      <CodeFixSection code={analysis.suggestedFix} />
      <ActionsSection actions={analysis.recommendedActions} />
      <DownloadButton analysis={analysis} />
    </div>
  )}
</div>
```

#### 1.7 AI Client (`src/utils/aiClient.ts`)

```typescript
export async function analyzeErrorWithAI(
  errorLog: LogEntry,
  contextLogs: LogEntry[]
): Promise<ErrorAnalysis> {
  const response = await fetch('/api/analyze-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ errorLog, contextLogs })
  });
  
  if (!response.ok) throw new Error('Analysis failed');
  const data = await response.json();
  return data.analysis;
}
```

---

### Phase 2: RCA Document Generation

#### 2.1 RCA Generator (`backend/src/services/rcaGenerator.ts`)
- Combine analysis results with:
  - Timeline of events
  - Service dependency map
  - Metrics snapshot (error rate, latency, resource usage)
  - Historical context (if available)
- Generate structured RCA document

#### 2.2 PDF Exporter (`backend/src/services/pdfExporter.ts`)
- Use `pdfkit` or `puppeteer` to generate PDF
- Include:
  - Executive Summary
  - Root Cause Analysis
  - Timeline
  - Affected Services Graph
  - Recommended Actions
  - Code Fixes
  - Follow-up Items

#### 2.3 RCA Download Endpoint (`backend/src/routes/rcaDocument.ts`)

```typescript
POST /api/generate-rca
{
  "analysis": { /* from /api/analyze-error */ },
  "format": "pdf" | "markdown"
}

Response: 
- PDF: Stream file with Content-Type: application/pdf
- Markdown: JSON with markdown content
```

---

### Phase 3: Integration with LogVisualizer

#### 3.1 Update App.tsx
- Detect critical errors in parsed logs
- Show "Critical Errors Detected" badge
- Render AIAnalyzer component conditionally

#### 3.2 Critical Error Detection Logic
```typescript
const criticalErrors = parsedData?.logs.filter(log => 
  log.level === 'ERROR' || log.level === 'FATAL' || 
  (log.status_code && log.status_code >= 500)
);

if (criticalErrors && criticalErrors.length > 0) {
  // Show AI Analyzer panel
}
```

---

## 🛠️ Technical Specifications

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "pdfkit": "^0.13.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@types/express": "^4.17.20",
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1"
  }
}
```

### Frontend Integration
- Add to existing `package.json`:
  ```json
  "devDependencies": {
    "axios": "^1.6.0"
  }
  ```

### Environment Variables (`.env.example`)
```env
# LLM Provider (choose one)
LLM_PROVIDER=replicate  # Options: replicate, huggingface, together
REPLICATE_API_TOKEN=your_token
HF_API_TOKEN=your_token
TOGETHER_API_KEY=your_key

# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Optional: Database (for storing RCA history)
DATABASE_URL=postgresql://user:pass@localhost:5432/logvisualizer_db
```

---

## 🚀 Implementation Steps

### Step 1: Backend Scaffold (Day 1)
- [ ] Create `backend/` folder structure
- [ ] Setup Express server with CORS
- [ ] Create TypeScript config
- [ ] Setup environment variables

### Step 2: LLM Integration (Day 2)
- [ ] Implement `llmProvider.ts` with Replicate provider
- [ ] Add Hugging Face fallback provider
- [ ] Create prompt templates
- [ ] Test LLM API calls

### Step 3: Error Analysis Endpoint (Day 3)
- [ ] Implement `errorAnalyzer.ts`
- [ ] Build POST `/api/analyze-error` route
- [ ] Add error handling & validation
- [ ] Test with sample logs

### Step 4: Frontend Integration (Day 4)
- [ ] Create `AIAnalyzer.tsx` component
- [ ] Create `aiClient.ts` utility
- [ ] Integrate into App.tsx
- [ ] Add UI for critical error detection

### Step 5: RCA & Export (Day 5)
- [ ] Implement `rcaGenerator.ts`
- [ ] Add PDF exporter
- [ ] Create `/api/generate-rca` endpoint
- [ ] Add download buttons to frontend

### Step 6: Deployment (Day 6)
- [ ] Deploy backend to Render/Railway/Fly.io
- [ ] Update frontend API endpoints
- [ ] Deploy frontend to Vercel
- [ ] Setup CI/CD pipeline

---

## 📊 Success Criteria

- ✅ Can paste/upload logs and detect critical errors
- ✅ AI analyzer triggers automatically for ERROR/FATAL levels
- ✅ Receives structured analysis (root cause, fix, severity) within 10 seconds
- ✅ Can download RCA as PDF document
- ✅ Falls back gracefully if LLM provider is down
- ✅ No local model deployment - all cloud-hosted
- ✅ Cost < $1 per analysis (using cheapest provider)
- ✅ Works with TypeScript across frontend & backend

---

## 🔗 References & Resources

### LLM Providers
- **Replicate**: https://replicate.com (easy to get started)
- **Hugging Face**: https://huggingface.co/inference-api (free tier)
- **Together AI**: https://www.together.ai (cheapest)
- **Groq**: https://groq.com (fastest, free)

### Open-Source Models
- **Llama 2 70B**: Best overall
- **Mistral 7B**: Faster, smaller
- **CodeLlama**: Best for code analysis
- **Deepseek**: Good code understanding

### Libraries
- **PDFKit**: https://pdfkit.org/ (PDF generation)
- **Puppeteer**: https://pptr.dev/ (for complex HTML→PDF)
- **Zod**: https://zod.dev (validation)

### Example Prompts & Patterns
- OpenAI Cookbook: https://github.com/openai/openai-cookbook
- LangChain: https://langchain.com (for advanced LLM chains)

---

## ⚠️ Important Notes

1. **No Local Model Deployment**: All LLM calls go to hosted cloud services. No need to run Ollama or LocalAI locally.

2. **API Costs**: 
   - Replicate: ~$0.001 per 1M tokens
   - HF Free: 100 calls/month free
   - Together AI: ~$0.0002 per 1M tokens

3. **Error Handling**: All LLM API calls must have:
   - Timeout (10-15 seconds)
   - Retry logic with exponential backoff
   - Fallback to alternative provider

4. **Rate Limiting**: Implement rate limiting on backend to prevent abuse.

5. **Security**: 
   - Never commit `.env` file
   - Use API keys only server-side
   - Validate all frontend inputs

6. **TypeScript**: Maintain strict type checking across frontend & backend.

---

## 📝 Questions for Clarification

Before starting, confirm:
1. Which LLM provider to prioritize? (Replicate/HF/Together/Groq)
2. Should we store RCA history in database or keep stateless?
3. Any specific error patterns to prioritize? (timeouts, memory, database, auth)
4. Should AI analysis trigger automatically or require manual button click?
5. Need webhook notifications when critical errors are detected?

---

## 📞 Support & Escalation

If blocked on:
- **LLM API integration**: Refer to provider docs + existing examples
- **React/TypeScript issues**: Check LogVisualizer codebase patterns
- **Backend errors**: Add detailed logging, use Postman to test APIs
- **Deployment**: Use provider-specific deployment guides
