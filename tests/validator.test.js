const { isInvalidEmail, isEmptyPayload } = require('../validator')

test('valid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.name@example.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false)
})

test('invalid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.name",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})

test('empty payload', function() {
    const testPayload = {}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})

test('non-empty payload', function() {
    const testPayload = {
        name: "test name",
        email: "test.name@example.com",
        interests: "testing"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})