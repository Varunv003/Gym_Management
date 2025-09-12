package com.varun.gym.gymMember.gym.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MembershipType {
    BRONZE("Basic"),
    SILVER("Pro"),
    GOLD("Gold"),
    PLATINUM("Lite");

    private final String displayName;

    MembershipType(String displayName) {
        this.displayName = displayName;
    }

    // This sends the display name (e.g., "Lite") to Angular
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    // This reads the display name (e.g., "Lite") from Angular and finds the correct enum
    @JsonCreator
    public static MembershipType fromDisplayName(String text) {
        for (MembershipType type : MembershipType.values()) {
            if (type.displayName.equalsIgnoreCase(text)) {
                return type;
            }
        }
        // Fallback for safety, in case the enum name itself is sent
        try {
            return valueOf(text.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("No MembershipType with display name '" + text + "' found.");
        }
    }
}

