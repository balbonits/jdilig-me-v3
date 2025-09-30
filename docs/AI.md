# AI - Claude Code Integration Documentation

## Purpose
This document outlines how Claude Code (AI assistant) is utilized in this project for development, maintenance, and documentation.

## Context Management
Claude Code has access to:
- Project structure and file system
- Code conventions (CONVENTIONS.md)
- Documentation files in `/docs/`
- Git history and status
- Testing and build configurations

## Development Workflow
1. **Code Generation**: Component creation following established patterns
2. **Refactoring**: Restructuring code while maintaining functionality
3. **Testing**: Writing and updating test suites
4. **Documentation**: Maintaining technical docs and inline comments
5. **Code Review**: Identifying issues and suggesting improvements

## Guidelines for AI Assistance
- Follow project conventions strictly
- Resolve linting/TypeScript errors (never disable rules)
- Maintain folder-based component structure
- Use TypeScript type imports properly
- Create tests alongside components
- Document significant architectural decisions

## Limitations
- No unsolicited feature additions
- No external dependencies without approval
- No file creation outside defined structure
- No modification of core configurations without discussion

## Best Practices
- Always read files before editing
- Batch related changes together
- Run tests after modifications
- Update documentation when changing architecture
- Use TodoWrite for task tracking