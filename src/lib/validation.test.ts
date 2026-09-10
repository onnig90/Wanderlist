import {
    isValid,
    NAME_MAX_LENGTH,
    NOTES_MAX_LENGTH,
    validatePlaceForm,
} from "./validation";

// One good draft, and each test changes exactly one field of it. A test that
// rebuilds the whole form every time hides which field it is actually about.
const goodDraft = { name: "Lisbon", notes: "Go in spring.", category: "city" };

describe("validatePlaceForm", () => {
    it("accepts a filled-in form", () => {
        expect(validatePlaceForm(goodDraft)).toEqual({});
    });

    it("rejects an empty name", () => {
        const errors = validatePlaceForm({ ...goodDraft, name: "" });
        expect(errors.name).toBe("Name is required.");
    });

    it("rejects a name that is only spaces", () => {
        const errors = validatePlaceForm({ ...goodDraft, name: "   " });
        expect(errors.name).toBe("Name is required.");
    });

    // The pair below is the whole point of a limit: one character on each side
    // of it. A single test at 500 characters would pass with >= or > alike.
    it("accepts a name at exactly the limit", () => {
        const name = "a".repeat(NAME_MAX_LENGTH);
        expect(validatePlaceForm({ ...goodDraft, name })).toEqual({});
    });

    it("rejects a name one character over the limit", () => {
        const name = "a".repeat(NAME_MAX_LENGTH + 1);
        const errors = validatePlaceForm({ ...goodDraft, name });
        expect(errors.name).toContain("60 characters or fewer");
    });

    it("rejects a name that is only digits", () => {
        const errors = validatePlaceForm({ ...goodDraft, name: "12345" });
        expect(errors.name).toBe("Name cannot be only digits.");
    });

    it("accepts a name that merely contains digits", () => {
        expect(validatePlaceForm({ ...goodDraft, name: "Platform 9" })).toEqual(
            {},
        );
    });

    it("accepts a category whatever the case and spacing", () => {
        expect(
            validatePlaceForm({ ...goodDraft, category: "  CITY " }),
        ).toEqual({});
    });

    it("rejects a category that is not on the list", () => {
        const errors = validatePlaceForm({ ...goodDraft, category: "beach" });
        expect(errors.category).toContain("city, nature, food, other");
    });

    it("does not complain about empty notes", () => {
        expect(validatePlaceForm({ ...goodDraft, notes: "" })).toEqual({});
    });

    it("accepts notes at exactly the limit", () => {
        const notes = "a".repeat(NOTES_MAX_LENGTH);
        expect(validatePlaceForm({ ...goodDraft, notes })).toEqual({});
    });

    it("rejects notes one character over the limit", () => {
        const notes = "a".repeat(NOTES_MAX_LENGTH + 1);
        const errors = validatePlaceForm({ ...goodDraft, notes });
        expect(errors.notes).toContain("200 characters or fewer");
    });

    it("does not count surrounding spaces towards the limit", () => {
        const notes = `   ${"a".repeat(NOTES_MAX_LENGTH)}   `;
        expect(validatePlaceForm({ ...goodDraft, notes })).toEqual({});
    });
});

describe("isValid", () => {
    it("is true when nothing was found", () => {
        expect(isValid({})).toBe(true);
    });

    it("is false when any field has an error", () => {
        expect(isValid({ name: "Name is required." })).toBe(false);
    });
});
