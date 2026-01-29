import sys

TOPIC_TAGS = {
    "coss": ["#COSHH", "#HazardousSubstances", "#SafetyAtWork"],
    "fire": ["#FireSafety", "#FireMarshal", "#WorkplaceSafety"],
    "risk": ["#RiskAssessment", "#HSE", "#SafetyManagement"],
    "ppe": ["#PPE", "#PersonalProtectiveEquipment", "#SafetyFirst"],
    "loler": ["#LOLER", "#LiftingOperations", "#ConstructionSafety"],
    "puwer": ["#PUWER", "#MachinerySafety", "#WorkplaceSafety"],
}

BASE = [
    "#HealthAndSafety",
    "#WorkplaceSafety",
    "#SafetyCulture",
    "#NearMiss",
    "#AccidentPrevention",
    "#ToolboxTalk",
]


def main():
    topic = (sys.argv[1] if len(sys.argv) > 1 else "risk").lower()
    tags = BASE + TOPIC_TAGS.get(topic, [])
    # de-dupe, keep order
    seen = set()
    out = []
    for t in tags:
        if t not in seen:
            seen.add(t)
            out.append(t)
    print(" ".join(out[:15]))


if __name__ == "__main__":
    main()
