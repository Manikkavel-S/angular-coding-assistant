import { TestBed } from '@angular/core/testing';
import { BooleanLogicService } from './boolean-logic.service';

describe('BooleanLogicService (Task 5)', () => {
  let service: BooleanLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooleanLogicService);
  });

  it('should be created and contain preset example problems', () => {
    expect(service).toBeTruthy();
    expect(service.presetExamples.length).toBeGreaterThanOrEqual(5);
  });

  // TC04: Boolean AND -> correct
  it('TC04: should correctly evaluate Boolean AND and generate reasoning steps', () => {
    const res1 = service.evaluate('A AND B', { A: true, B: true });
    expect(res1.isValid).toBe(true);
    expect(res1.finalResult).toBe(true);
    expect(res1.reasoningSteps.length).toBeGreaterThan(0);

    const res2 = service.evaluate('A AND B', { A: true, B: false });
    expect(res2.isValid).toBe(true);
    expect(res2.finalResult).toBe(false);
  });

  // TC05: Boolean OR -> correct
  it('TC05: should correctly evaluate Boolean OR and generate reasoning steps', () => {
    const res1 = service.evaluate('A OR B', { A: false, B: true });
    expect(res1.isValid).toBe(true);
    expect(res1.finalResult).toBe(true);

    const res2 = service.evaluate('A OR B', { A: false, B: false });
    expect(res2.isValid).toBe(true);
    expect(res2.finalResult).toBe(false);
  });

  // TC06: Boolean NOT -> correct
  it('TC06: should correctly evaluate Boolean NOT and generate reasoning steps', () => {
    const res1 = service.evaluate('NOT A', { A: true });
    expect(res1.isValid).toBe(true);
    expect(res1.finalResult).toBe(false);

    const res2 = service.evaluate('NOT A', { A: false });
    expect(res2.isValid).toBe(true);
    expect(res2.finalResult).toBe(true);
  });

  it('should correctly evaluate nested expressions with parentheses', () => {
    // (A AND B) OR (NOT C) where A=true, B=false, C=false -> (false) OR (true) -> true
    const res = service.evaluate('(A AND B) OR (NOT C)', { A: true, B: false, C: false });
    expect(res.isValid).toBe(true);
    expect(res.finalResult).toBe(true);
    expect(res.reasoningSteps.some(s => s.operation === 'NOT')).toBe(true);
    expect(res.reasoningSteps.some(s => s.operation === 'AND')).toBe(true);
    expect(res.reasoningSteps.some(s => s.operation === 'OR')).toBe(true);
  });

  it('should handle syntax errors safely without throwing exceptions', () => {
    const emptyRes = service.evaluate('', { A: true });
    expect(emptyRes.isValid).toBe(false);
    expect(emptyRes.errorMessage).toContain('cannot be empty');

    const invalidSyntax = service.evaluate('(A AND', { A: true });
    expect(invalidSyntax.isValid).toBe(false);
    expect(invalidSyntax.errorMessage).toBeDefined();

    const unexpectedChar = service.evaluate('A @ B', { A: true, B: false });
    expect(unexpectedChar.isValid).toBe(false);
  });
});
