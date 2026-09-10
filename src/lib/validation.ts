import { Place } from "./types";

export type PlaceDraft = {
    name: string;
    notes: string;
    category: string;
};

export type FormErrors = {
    name?: string;
    notes?: string;
    category?: string;
};

export const CATEGORIES: Place["category"][] = [
    "city",
    "nature",
    "food",
    "other",
];

export const NAME_MAX_LENGTH = 60;
export const NOTES_MAX_LENGTH = 200;

// Same input, same output, no state and no screen. That is what "pure" means,
// and it is the whole reason this can be tested while the Add screen cannot.
export function validatePlaceForm(draft: PlaceDraft): FormErrors {
    const errors: FormErrors = {};

    // else-if, not three separate ifs: a field holds one message, so the first
    // rule that matches is the one the user gets told about.
    const name = draft.name.trim();
    if (!name) {
        errors.name = "Name is required.";
    } else if (name.length > NAME_MAX_LENGTH) {
        errors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
    } else if (/^\d+$/.test(name)) {
        errors.name = "Name cannot be only digits.";
    }

    const category = draft.category.trim().toLowerCase() as Place["category"];
    if (!CATEGORIES.includes(category)) {
        errors.category = `Category must be one of: ${CATEGORIES.join(", ")}.`;
    }

    // Measure what actually gets saved: the Add screen trims before storing.
    if (draft.notes.trim().length > NOTES_MAX_LENGTH) {
        errors.notes = `Notes must be ${NOTES_MAX_LENGTH} characters or fewer.`;
    }

    return errors;
}

export function isValid(errors: FormErrors): boolean {
    return Object.keys(errors).length === 0;
}
