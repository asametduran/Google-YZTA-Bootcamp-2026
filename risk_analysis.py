import json
from datetime import datetime, timezone

import numpy as np
import pandas as pd


SURVEY_COLUMNS = [
    "screen_time_overuse",
    "stress_scrolling",
    "late_night_use",
    "support_seeking",
    "notification_compulsion",
]

RISK_COLUMNS = ["screen_time_overuse", "stress_scrolling", "late_night_use", "notification_compulsion"]
RESILIENCE_COLUMNS = ["support_seeking", "coping_skills", "routine_stability", "sleep_quality", "social_support"]


def build_mock_dataset() -> pd.DataFrame:
    data = [
        {
            "participant_id": "YZTA-001",
            "screen_time_overuse": 2,
            "stress_scrolling": 2,
            "late_night_use": 1,
            "support_seeking": 5,
            "notification_compulsion": 2,
            "coping_skills": 5,
            "routine_stability": 4,
            "sleep_quality": 4,
            "social_support": 5,
        },
        {
            "participant_id": "YZTA-002",
            "screen_time_overuse": 4,
            "stress_scrolling": 4,
            "late_night_use": 4,
            "support_seeking": 2,
            "notification_compulsion": 4,
            "coping_skills": 2,
            "routine_stability": 2,
            "sleep_quality": 2,
            "social_support": 2,
        },
        {
            "participant_id": "YZTA-003",
            "screen_time_overuse": 3,
            "stress_scrolling": 3,
            "late_night_use": 3,
            "support_seeking": 3,
            "notification_compulsion": 3,
            "coping_skills": 3,
            "routine_stability": 3,
            "sleep_quality": 3,
            "social_support": 3,
        },
        {
            "participant_id": "YZTA-004",
            "screen_time_overuse": 5,
            "stress_scrolling": 5,
            "late_night_use": 4,
            "support_seeking": 1,
            "notification_compulsion": 5,
            "coping_skills": 1,
            "routine_stability": 2,
            "sleep_quality": 1,
            "social_support": 1,
        },
        {
            "participant_id": "YZTA-005",
            "screen_time_overuse": 1,
            "stress_scrolling": 1,
            "late_night_use": 1,
            "support_seeking": 4,
            "notification_compulsion": 1,
            "coping_skills": 4,
            "routine_stability": 5,
            "sleep_quality": 5,
            "social_support": 4,
        },
        {
            "participant_id": "YZTA-006",
            "screen_time_overuse": 4,
            "stress_scrolling": 3,
            "late_night_use": 5,
            "support_seeking": 2,
            "notification_compulsion": 4,
            "coping_skills": 3,
            "routine_stability": 2,
            "sleep_quality": 2,
            "social_support": 3,
        },
        {
            "participant_id": "YZTA-007",
            "screen_time_overuse": 2,
            "stress_scrolling": 3,
            "late_night_use": 2,
            "support_seeking": 4,
            "notification_compulsion": 2,
            "coping_skills": 4,
            "routine_stability": 4,
            "sleep_quality": 4,
            "social_support": 4,
        },
        {
            "participant_id": "YZTA-008",
            "screen_time_overuse": 5,
            "stress_scrolling": 4,
            "late_night_use": 4,
            "support_seeking": 1,
            "notification_compulsion": 4,
            "coping_skills": 2,
            "routine_stability": 1,
            "sleep_quality": 2,
            "social_support": 2,
        },
    ]
    return pd.DataFrame(data)


def clamp_score(value: float) -> float:
    return float(np.clip(value, 0, 100))


def calculate_risk_score(row: pd.Series) -> float:
    raw_risk = np.mean([row[column] for column in RISK_COLUMNS])
    support_offset = 6 - float(row["support_seeking"])
    combined = np.mean([raw_risk, support_offset])
    return clamp_score((combined / 5.0) * 100.0)


def calculate_resilience_score(row: pd.Series) -> float:
    resilience_mean = np.mean([row[column] for column in RESILIENCE_COLUMNS])
    return clamp_score((resilience_mean / 5.0) * 100.0)


def classify_risk(score: float) -> str:
    if score < 35:
        return "Düşük"
    if score < 65:
        return "Orta"
    return "Yüksek"


def build_participant_report(dataset: pd.DataFrame) -> pd.DataFrame:
    report = dataset.copy()
    report["risk_score"] = report.apply(calculate_risk_score, axis=1)
    report["resilience_score"] = report.apply(calculate_resilience_score, axis=1)
    report["risk_level"] = report["risk_score"].apply(classify_risk)
    return report


def build_summary(report: pd.DataFrame) -> dict:
    distribution = report["risk_level"].value_counts().reindex(["Düşük", "Orta", "Yüksek"], fill_value=0)
    top_risk = report.sort_values("risk_score", ascending=False).iloc[0]
    strongest = report.sort_values("resilience_score", ascending=False).iloc[0]

    return {
        "sample_size": int(len(report)),
        "average_risk_score": round(float(report["risk_score"].mean()), 2),
        "average_resilience_score": round(float(report["resilience_score"].mean()), 2),
        "risk_level_distribution": {
            "Düşük": int(distribution["Düşük"]),
            "Orta": int(distribution["Orta"]),
            "Yüksek": int(distribution["Yüksek"]),
        },
        "highest_risk_participant": {
            "participant_id": top_risk["participant_id"],
            "risk_score": round(float(top_risk["risk_score"]), 2),
            "risk_level": top_risk["risk_level"],
        },
        "highest_resilience_participant": {
            "participant_id": strongest["participant_id"],
            "resilience_score": round(float(strongest["resilience_score"]), 2),
        },
        "insights": [
            "Dijital kullanım arttıkça stresle baş etmede ek destek ihtiyacı belirginleşebilir.",
            "Düzenli uyku ve destek arama davranışı, risk puanını aşağı çeken güçlü koruyucu faktörlerdir.",
        ],
    }


def main() -> None:
    dataset = build_mock_dataset()
    report = build_participant_report(dataset)

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "summary": build_summary(report),
        "participants": [
            {
                "participant_id": row.participant_id,
                "survey": {
                    "screen_time_overuse": int(row.screen_time_overuse),
                    "stress_scrolling": int(row.stress_scrolling),
                    "late_night_use": int(row.late_night_use),
                    "support_seeking": int(row.support_seeking),
                    "notification_compulsion": int(row.notification_compulsion),
                },
                "resilience_metrics": {
                    "coping_skills": int(row.coping_skills),
                    "routine_stability": int(row.routine_stability),
                    "sleep_quality": int(row.sleep_quality),
                    "social_support": int(row.social_support),
                },
                "risk_score": round(float(row.risk_score), 2),
                "resilience_score": round(float(row.resilience_score), 2),
                "risk_level": row.risk_level,
            }
            for row in report.itertuples(index=False)
        ],
    }

    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
