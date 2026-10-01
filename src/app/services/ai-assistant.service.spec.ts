import { TestBed } from '@angular/core/testing';
import { AiAssistantService } from './ai-assistant.service';
import { SYSTEM_PROMPT } from '../constants/system-prompt.constant';

describe('AiAssistantService', () => {
  let service: AiAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiAssistantService);
  });

  it('should be created with initial welcome message and active system prompt', () => {
    expect(service).toBeTruthy();
    expect(service.systemPrompt).toBe(SYSTEM_PROMPT);
    expect(service.chatMessages().length).toBeGreaterThan(0);
    expect(service.isMock).toBe(true);
  });

  // TC01: Angular component request -> component guidance
  it('TC01: should return component guidance when user asks to create component', async () => {
    const result = await service.processPrompt('Create an Angular component', service.systemPrompt);
    expect(result).toBeTruthy();
    expect(result.detectedTopic).toContain('Components');
    expect(result.codeBlock).toBeDefined();
    expect(result.codeBlock?.code).toContain('@Component');
    expect(result.importantNotes?.length).toBeGreaterThan(0);
  });

  // TC02: Service request -> service example
  it('TC02: should return service guidance when user asks to create service', async () => {
    const result = await service.processPrompt('Create an Angular service', service.systemPrompt);
    expect(result).toBeTruthy();
    expect(result.detectedTopic).toContain('Services');
    expect(result.codeBlock?.code).toContain('@Injectable');
  });

  // TC03: Empty input -> validation message
  it('TC03: should validate empty input and set error message without crashing', async () => {
    const successEmpty = await service.sendMessage('');
    expect(successEmpty).toBe(false);
    expect(service.lastError()).toContain('Please enter a question or prompt');

    const successWhitespace = await service.sendMessage('   ');
    expect(successWhitespace).toBe(false);
    expect(service.lastError()).toContain('Please enter a question or prompt');
  });

  // TC10: Clear chat -> history cleared
  it('TC10: should clear chat history back to initial state', async () => {
    await service.sendMessage('Explain Angular routing');
    expect(service.chatMessages().length).toBeGreaterThan(1);

    service.clearChat();
    expect(service.chatMessages().length).toBe(1);
    expect(service.chatMessages()[0].text).toContain('Chat history has been cleared');
  });

  it('should combine system prompt and user prompt properly', () => {
    const combined = service.constructCombinedPrompt('Create a login form');
    expect(combined).toContain('[SYSTEM PROMPT]');
    expect(combined).toContain(SYSTEM_PROMPT);
    expect(combined).toContain('[USER REQUEST]');
    expect(combined).toContain('Create a login form');
  });

  it('should synthesize dynamic fallback response for custom unknown prompts', async () => {
    const customPrompt = 'How do I build a micro-frontend architecture in Angular?';
    const result = await service.processPrompt(customPrompt, service.systemPrompt);
    expect(result).toBeTruthy();
    expect(result.explanation).toContain('micro-frontend');
    expect(result.codeBlock).toBeDefined();
    expect(result.importantNotes?.length).toBeGreaterThan(0);
  });
});
