// Import testing tools from Vitest and the functions we want to test from api.js
import { describe, it, expect, vi } from 'vitest';
import { saveNote, fetchNotes } from './api';

// This "mocks" (fakes) the fetch function so we don't accidentally send real data to Firebase during a test
global.fetch = vi.fn();

// A 'describe' block groups related tests together (in this case, all API tests)
describe('Notes API Unit Tests', () => {
  
  // 'it' defines a specific test case: checking if 'saveNote' uses the right method
  it('should call fetch with POST method when saving a note', async () => {
    // We tell the fake fetch to act like the server and say "OK, I saved it"
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ name: 'test-id' }) });
    
    // We run our actual function with test text
    await saveNote("Test Note");
    
    // We check if our code tried to use the 'POST' command (which creates a new note)
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: 'POST'
    }));
  });

  // This test checks if the code correctly turns a Firebase "Map" into a React "Array"
  it('should return an array of notes when fetching', async () => {
    // We create fake data that looks exactly like what Firebase sends back
    const mockData = { "1": { content: "Hello", date: "2026-01-13" } };
    
    // We tell the fake fetch to hand us this fake data when we ask for it
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockData) });
    
    // We run our actual fetchNotes function
    const result = await fetchNotes();
    
    // We verify that the result is a List (Array) and not a Map (Object)
    expect(Array.isArray(result)).toBe(true);
    // We verify the first note in the list has the correct text "Hello"
    expect(result[0].content).toBe("Hello");
  });
});