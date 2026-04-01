# 신고해줘 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 4대보험 신고서 자동작성 + FAX 발송 SaaS의 랜딩 페이지와 MVP 프로덕트를 구축한다.

**Architecture:** Next.js App Router 기반 싱글 앱. 랜딩 페이지(`/`)와 앱(`/app`)을 하나의 프로젝트에서 제공. PDF 생성은 브라우저에서 pdf-lib로 처리하여 개인정보를 서버에 보관하지 않는다. FAX 발송만 서버 API Route를 경유한다.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4, pdf-lib (브라우저), 팝빌 Node.js SDK (서버), Vercel 배포

---

## 태스크 목록

| Task | 내용 | 예상 일정 |
|------|------|----------|
| 1 | 프로젝트 초기 세팅 | Day 1 |
| 2 | TypeScript 타입 정의 + 코드 데이터 | Day 1 |
| 3 | localStorage 래퍼 + 관할지사 데이터 | Day 2 |
| 4 | 랜딩 페이지 (7개 섹션) | Day 2 |
| 5 | 사업장 정보 설정 + 대시보드 | Day 3 |
| 6 | PDF 생성 엔진 (핵심) | Day 4-5 |
| 7 | 신고서 작성 플로우 (Report Wizard) | Day 6-7 |
| 8 | 관할지사 데이터 수집 | Day 8 |
| 9 | FAX 발송 API (팝빌) | Day 8 |
| 10 | CSV 업로더 + 최종 통합 테스트 + 배포 | Day 9 |

상세 구현 내용은 각 태스크 실행 시 subagent에게 스펙 문서와 함께 전달됩니다.
스펙 문서: `docs/superpowers/specs/2026-04-01-singohejwo-design.md`
