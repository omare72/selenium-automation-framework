# Selenium Automation Framework

A multi-page test automation framework built with Selenium WebDriver, Mocha, and Chai.

## Project Structure

- `pages/` — Page Object Model classes
- `tests/` — Test suites
- `reports/` — Mochawesome HTML reports
- `screenshots/` — Auto-captured on test failure
- `config.js` — Central configuration

## Tech Stack

- Selenium WebDriver
- Mocha (test runner)
- Chai (assertions)
- Mochawesome (reporting)
- Node.js / JavaScript

## What is tested

- Contact form — functional, negative, edge, security, usability
- Home page — navigation, visibility, title

## How to run

```bash
npm install
npm test
```

## Features

- Page Object Model (POM)
- Base page with shared methods
- Data-driven testing
- Screenshot on failure
- HTML test reports
- Test retry on flaky failures

## Test Summary

| Test File           | Tests        | Coverage                                        |
| ------------------- | ------------ | ----------------------------------------------- |
| contactForm.test.js | 11 tests     | Functional, negative, edge, security, usability |
| homePage.test.js    | 3 tests      | Navigation, visibility, title                   |
| **Total**           | **14 tests** | **Multi-page coverage**                         |
