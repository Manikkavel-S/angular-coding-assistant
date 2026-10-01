import { Injectable, signal } from '@angular/core';
import { BooleanExpressionResult, ReasoningStep, ExampleProblem } from '../models/boolean-logic.model';

type TokenType = 'VAR' | 'BOOL' | 'NOT' | 'AND' | 'OR' | 'XOR' | 'LPAREN' | 'RPAREN';

interface Token {
  type: TokenType;
  value: string;
  position: number;
}

@Injectable({
  providedIn: 'root'
})
export class BooleanLogicService {
  // Preset example problems for 1-click loading
  readonly presetExamples: ExampleProblem[] = [
    {
      title: 'Basic Conjunction (A AND B)',
      expression: 'A AND B',
      variables: { A: true, B: false, C: true },
      description: 'Simple logical conjunction testing if both inputs evaluate to true.'
    },
    {
      title: 'Disjunction with Negation ((NOT A) OR B)',
      expression: '(NOT A) OR B',
      variables: { A: true, B: true, C: false },
      description: 'Logical OR with negated first term demonstrating operator precedence.'
    },
    {
      title: 'Compound Nested Condition ((A AND B) OR (NOT C))',
      expression: '(A AND B) OR (NOT C)',
      variables: { A: true, B: false, C: false },
      description: 'Complex nested Boolean expression with parentheses, conjunction, and negation.'
    },
    {
      title: 'De Morgan\'s Law Check (NOT (A OR B))',
      expression: 'NOT (A OR B)',
      variables: { A: false, B: false, C: true },
      description: 'Educational reasoning demonstrating De Morgan\'s Law with parenthesized disjunction.'
    },
    {
      title: 'Three-Variable Logic ((A OR B) AND (C AND (NOT A)))',
      expression: '(A OR B) AND (C AND (NOT A))',
      variables: { A: false, B: true, C: true },
      description: 'Multi-variable decision tree testing intermediate step-by-step simplification.'
    }
  ];

  /**
   * Evaluates Boolean expression using safe custom tokenizer & AST evaluator (Zero eval())
   */
  evaluate(rawExpression: string, variables: Record<string, boolean>): BooleanExpressionResult {
    const startTime = performance.now();
    const normalized = rawExpression ? rawExpression.trim() : '';

    if (!normalized) {
      return {
        rawExpression,
        normalizedExpression: '',
        variables,
        finalResult: false,
        reasoningSteps: [],
        isValid: false,
        errorMessage: 'Expression cannot be empty. Please enter a Boolean expression (e.g. A AND B).',
        executionTimeMs: 0
      };
    }

    try {
      const tokens = this.tokenize(normalized);
      if (tokens.length === 0) {
        throw new Error('No valid tokens detected.');
      }

      const steps: ReasoningStep[] = [];
      let stepCounter = 1;

      // Safe Recursive Descent Parser with Step Recording
      const result = this.parseExpression(tokens, variables, steps, () => stepCounter++);

      const duration = performance.now() - startTime;
      return {
        rawExpression,
        normalizedExpression: normalized,
        variables,
        finalResult: result,
        reasoningSteps: steps,
        isValid: true,
        executionTimeMs: Number(duration.toFixed(2))
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid Boolean expression syntax.';
      const duration = performance.now() - startTime;
      return {
        rawExpression,
        normalizedExpression: normalized,
        variables,
        finalResult: false,
        reasoningSteps: [],
        isValid: false,
        errorMessage,
        executionTimeMs: Number(duration.toFixed(2))
      };
    }
  }

  /**
   * Tokenizer: Converts string input into discrete typed tokens safely
   */
  private tokenize(expr: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < expr.length) {
      const char = expr[i];

      // Skip whitespaces
      if (/\s/.test(char)) {
        i++;
        continue;
      }

      // Parentheses
      if (char === '(') {
        tokens.push({ type: 'LPAREN', value: '(', position: i });
        i++;
        continue;
      }
      if (char === ')') {
        tokens.push({ type: 'RPAREN', value: ')', position: i });
        i++;
        continue;
      }

      // Operators symbols
      if (char === '!' || char === '~') {
        tokens.push({ type: 'NOT', value: 'NOT', position: i });
        i++;
        continue;
      }
      if (char === '&' && expr[i + 1] === '&') {
        tokens.push({ type: 'AND', value: 'AND', position: i });
        i += 2;
        continue;
      }
      if (char === '|') {
        if (expr[i + 1] === '|') {
          tokens.push({ type: 'OR', value: 'OR', position: i });
          i += 2;
          continue;
        }
      }
      if (char === '^') {
        tokens.push({ type: 'XOR', value: 'XOR', position: i });
        i++;
        continue;
      }

      // Word-based tokens (Identifiers, Keywords)
      if (/[a-zA-Z0-9_]/.test(char)) {
        let word = '';
        const startPos = i;
        while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
          word += expr[i];
          i++;
        }

        const upper = word.toUpperCase();
        if (upper === 'AND') {
          tokens.push({ type: 'AND', value: 'AND', position: startPos });
        } else if (upper === 'OR') {
          tokens.push({ type: 'OR', value: 'OR', position: startPos });
        } else if (upper === 'NOT') {
          tokens.push({ type: 'NOT', value: 'NOT', position: startPos });
        } else if (upper === 'XOR') {
          tokens.push({ type: 'XOR', value: 'XOR', position: startPos });
        } else if (upper === 'TRUE' || upper === '1') {
          tokens.push({ type: 'BOOL', value: 'true', position: startPos });
        } else if (upper === 'FALSE' || upper === '0') {
          tokens.push({ type: 'BOOL', value: 'false', position: startPos });
        } else {
          // Variable identifier (A, B, C, etc.)
          tokens.push({ type: 'VAR', value: word, position: startPos });
        }
        continue;
      }

      throw new Error(`Unexpected character '${char}' at index ${i}`);
    }

    return tokens;
  }

  /**
   * Safe Recursive Descent Parser with Reasoning Steps Capture
   */
  private parseExpression(
    tokens: Token[],
    variables: Record<string, boolean>,
    steps: ReasoningStep[],
    nextStep: () => number
  ): boolean {
    let index = 0;

    const peek = (): Token | undefined => tokens[index];
    const consume = (expectedType?: TokenType): Token => {
      const current = tokens[index];
      if (!current) {
        throw new Error('Unexpected end of expression.');
      }
      if (expectedType && current.type !== expectedType) {
        throw new Error(`Expected ${expectedType} but found '${current.value}' at position ${current.position}`);
      }
      index++;
      return current;
    };

    // Grammar Hierarchy:
    // parseOr()   -> parseAnd() ('OR' parseAnd())*
    // parseAnd()  -> parseNot() ('AND' parseNot())*
    // parseNot()  -> 'NOT' parseNot() | parsePrimary()
    // parsePrimary() -> '(' parseOr() ')' | VAR | BOOL

    const parsePrimary = (): boolean => {
      const token = peek();
      if (!token) {
        throw new Error('Expected variable, boolean value, or parenthesized sub-expression.');
      }

      if (token.type === 'LPAREN') {
        consume('LPAREN');
        const innerResult = parseOr();
        consume('RPAREN');
        return innerResult;
      }

      if (token.type === 'BOOL') {
        consume('BOOL');
        return token.value === 'true';
      }

      if (token.type === 'VAR') {
        consume('VAR');
        const varName = token.value;
        const value = variables[varName] !== undefined ? variables[varName] : false;
        
        steps.push({
          stepNumber: nextStep(),
          subExpression: varName,
          operation: 'VARIABLE_LOOKUP',
          explanation: `Look up variable ${varName}: value is ${value}`,
          intermediateResult: value
        });

        return value;
      }

      throw new Error(`Unexpected token '${token.value}' at position ${token.position}`);
    };

    const parseNot = (): boolean => {
      const token = peek();
      if (token && token.type === 'NOT') {
        consume('NOT');
        const operand = parseNot();
        const result = !operand;

        steps.push({
          stepNumber: nextStep(),
          subExpression: `NOT (${operand})`,
          operation: 'NOT',
          explanation: `Evaluate NOT ${operand}: inverts truth value to ${result}`,
          intermediateResult: result
        });

        return result;
      }
      return parsePrimary();
    };

    const parseAnd = (): boolean => {
      let left = parseNot();

      while (peek()?.type === 'AND') {
        consume('AND');
        const right = parseNot();
        const prevLeft = left;
        left = left && right;

        steps.push({
          stepNumber: nextStep(),
          subExpression: `${prevLeft} AND ${right}`,
          operation: 'AND',
          explanation: `Evaluate ${prevLeft} AND ${right}: both operands must be true. Result: ${left}`,
          intermediateResult: left
        });
      }

      return left;
    };

    const parseOr = (): boolean => {
      let left = parseAnd();

      while (peek()?.type === 'OR' || peek()?.type === 'XOR') {
        const opToken = consume();
        const right = parseAnd();
        const prevLeft = left;

        if (opToken.type === 'OR') {
          left = left || right;
          steps.push({
            stepNumber: nextStep(),
            subExpression: `${prevLeft} OR ${right}`,
            operation: 'OR',
            explanation: `Evaluate ${prevLeft} OR ${right}: at least one operand is true. Result: ${left}`,
            intermediateResult: left
          });
        } else {
          left = left !== right;
          steps.push({
            stepNumber: nextStep(),
            subExpression: `${prevLeft} XOR ${right}`,
            operation: 'XOR',
            explanation: `Evaluate ${prevLeft} XOR ${right}: operands must differ. Result: ${left}`,
            intermediateResult: left
          });
        }
      }

      return left;
    };

    const finalValue = parseOr();

    if (index < tokens.length) {
      throw new Error(`Unexpected extra token '${tokens[index].value}' at position ${tokens[index].position}`);
    }

    return finalValue;
  }
}
