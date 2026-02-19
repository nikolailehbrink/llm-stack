# Project AI Agent Guidelines

## Purpose

This document defines mandatory rules and conventions for AI agents contributing to this repository.
Agents must follow these rules strictly when generating, modifying, or reviewing code.

---

# Core UI Rules

## 1. Component Library (MANDATORY)

- Always use **base-ui components via shadcn registry**
- Components are available through the MCP server
- Do NOT create custom primitive UI components if a base-ui component exists
- Do NOT reimplement components that exist in base-ui

### Toast Rule (Important)

- ❌ Do NOT use the default shadcn `toast` component (it is based on `sonner`)
- ❌ Do NOT install `sonner`
- ✅ If toast functionality is required, use the **base-ui toast implementation**
- ✅ If toast is not installed, install the base-ui version — never the sonner-based one

If uncertain, prefer base-ui over third-party toast solutions.

---

## 2. Design Consistency

When generating UI, the agent must:

- Use existing button variants before creating new ones
- Reuse existing color tokens (no arbitrary hex values)
- Follow existing spacing scale
- Use existing typography styles
- Prefer composition over customization
- Avoid inline styles unless absolutely necessary
- Avoid hardcoded colors
- Respect dark mode support

If unsure about styling:

- Inspect existing components
- Mirror patterns already used in the codebase

---

# Routing

## React Router

We use:

- React Router 7
- Framework mode
- Middleware support enabled

Because this may be beyond your training cutoff:

- Use the provided `react-router-framework-mode` skill when generating:
  - routes
  - loaders
  - actions
  - middleware
  - protected routes
  - nested layouts

Do NOT:

- Generate legacy React Router v5 patterns
- Use deprecated APIs
- Invent router APIs

Follow framework-mode patterns strictly.

---

# Authentication

We use:

- better-auth

Rules:

- Do not invent custom auth logic
- Do not implement JWT handling manually
- Use better-auth client/server utilities
- Respect middleware-based auth protection patterns
- Keep auth logic out of UI components

---

# Testing

We use:

- vitest

Rules:

- Write tests using vitest syntax
- Do NOT use jest
- Prefer unit tests for utilities
- Prefer integration-style tests for routes
- Avoid testing implementation details
- Mock external services appropriately

---

# Linting & Formatting

We use:

- oxfmt (NOT prettier)
- oxlint (NOT eslint)

Rules:

- Do not generate prettier configs
- Do not reference eslint
- Follow existing formatting style
- Avoid unnecessary formatting changes

---

# Code Style Guidelines

## General

- Use TypeScript strictly
- Avoid `any`
- Prefer explicit return types on exported functions
- Use functional components only
- Use hooks correctly (no conditional hooks)
- Avoid deeply nested components
- Keep components small and composable

## State Management

- Prefer local state
- Avoid global state unless necessary
- Do not introduce new state libraries without explicit instruction

---

# Dependency Rules

Before adding a new dependency:

1. Check if base-ui already provides the solution
2. Check if React Router or better-auth already solves it
3. Avoid adding utility libraries unnecessarily
4. Prefer platform APIs when possible

Do NOT:

- Add UI libraries
- Add styling libraries
- Add toast libraries
- Add form libraries unless explicitly required

---

# File & Folder Conventions

- Follow existing project structure
- Do not invent new top-level folders
- Place route files according to React Router framework mode
- Keep UI components separated from business logic
- Do not mix server and client code improperly

---

# Performance & DX

- Avoid unnecessary re-renders
- Use lazy loading for heavy routes
- Prefer suspense where appropriate
- Keep bundle size minimal
- Avoid over-abstraction

---

# Error Handling

- Use route error boundaries
- Use middleware for cross-cutting concerns
- Avoid silent failures
- Provide meaningful error messages
- Do not expose sensitive information

---

# Accessibility

- Use semantic HTML
- Use accessible base-ui components
- Ensure buttons have proper type
- Ensure inputs are labeled
- Avoid div-based click handlers

---

# Security

- Never expose secrets
- Never log sensitive tokens
- Sanitize user input where required
- Follow better-auth best practices
