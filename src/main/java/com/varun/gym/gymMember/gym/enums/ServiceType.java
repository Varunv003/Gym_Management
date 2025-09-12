package com.varun.gym.gymMember.gym.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ServiceType {
    PERSONAL_TRAINER("Personal Trainer"),
    SAUNA_ACCESS("Sauna Access"),
    POOL_ACCESS("Pool Access"),
    GROUP_CLASSES("Group Classes");

    private final String displayName;

    ServiceType(String displayName) {
        this.displayName = displayName;
    }

    // This sends the display name (e.g., "Personal Trainer") to Angular
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    // This reads the display name (e.g., "Personal Trainer") from Angular and finds the correct enum
    @JsonCreator
    public static ServiceType fromDisplayName(String text) {
        for (ServiceType type : ServiceType.values()) {
            if (type.displayName.equalsIgnoreCase(text)) {
                return type;
            }
        }
        // Fallback for safety, in case the enum name (e.g., "PERSONAL_TRAINER") is sent
        try {
            return valueOf(text.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("No ServiceType with display name '" + text + "' found.");
        }
    }
}

