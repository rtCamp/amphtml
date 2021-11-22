# Bento by Examples
> Detailed writeup of What is AMP & Bento? Benefits of Bento? What is Preact?

## Table of Contents
- [Setting up Environment](#setting-up-environment)
- [Directory Structure](#directory-structure)
- [Bridge between AMP and Bento](#bridge-between-amp-and-bento)
- [Execution Flow](#execution-flow)
- [Examples](#examples)
  - [Beginner](#beginner)
    - [Example 1: Hello World](#example-1-hello-world)
    - [Example 2: Counter](#example-2-counter)
    - [Example 3: Calculator](#example-3-calculator)
    - [Assignment 1](#assignment-1)
  - [Intermediate](#intermediate)
    - [Example 4: Currency Converter](#example-4-currency-converter)
    - [Assignment 2](#assignment-2)
  - [Advance](#advance)
    - [Example 5: Carousel](#example-5-carousel)
    - [Assignment 3](#assignment-3)
- [Storybook](#storybook)
- [Unit Tests](#unit-tests)
- [FAQ](#faq)
- [References](#references)

## Setting up Environment
> CLA signup, Clone `amphtml`, important VSCode extensions, important `amp` commands for creating, validating, testing & debugging

## Directory Structure
> Summarize directory structure & file usage for component, test-case and examples

## Bridge between AMP and Bento
> Represent & explain execution flow of AMP-Bento Bridge (created on miro) with commonly used mapping properties 
![Execution Flow: AMP-Bento Bridge](img/AMP-Bento%20Bridge.jpg "AMP-Bento Bridge")

## Execution Flow
> Represent & explain execution flow of Bento Component (created on miro)
![Execution Flow: Preact Component](img/Preact%20Functional%20Component.jpg "Preact Functional Component")

## Examples
> Summarize example structure that is divided into three major parts: Beginner, Intermediate and Advance

### Beginner
> Creating, Testing & Debugging summary with step-by-step explanation of command-line.
>
> Beginner makes it easy for developer to get familiar with Environment and with the basics of Bento Component.

#### Example 1: Hello World
> Basic rendering on Screen: "Hello World"

#### Example 2: Counter
> `useState`, `useCallback`, `property` mapping

#### Example 3: Calculator
> `useCallback` for multiple elements

#### Assignment 1
> Each part(here, Beginner) of the example ends with Assignment. This assignment are provided based on the examples provided on the part (here, Beginner).
>
> To be decided!

### Intermediate
> Get familiar `attributes`, `css` and `jss` 

#### Example 4: Currency Converter
> Learn `attributes`, `css`, `jss`, `useMemo` for HTTP API call

#### Assignment 2
- Add `auto-increment` and `initial-value` attribute for `Example 2`
- Add styling to `Example 2` & `Example 3`

### Advance
> Get familiary with API Functions & Events

#### Example 5: Carousel
> forwardRef Example (TBD)
 > Dynamic Components (nesting of Components)

#### Assignment 3
> To be decided!

## Storybook
> Explanation of how to write and test storybook examples.

## Unit Tests
> Explanation of how to write and test Unit-tests for `React` and `Preact`

## References
- Checks before sending PR
- Function explanation with use-case
- Storybook and TestCases
- Tools for Performance Analysis (for testing of custom designed Bento Component)
- Limitation

## FAQ
- Avoid DOM API (instead use Declarative Preact)
- Certified vs Non-Certified
- Isolated usage without AMP
- `useEffect` vs `useLayoutEffect`