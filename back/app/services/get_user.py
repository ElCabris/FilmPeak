from app.schemas.user import UserProfiles


def create_user_profile_response(
    email: str, profiles: list[dict[str, str]]
) -> UserProfiles:
    return UserProfiles(
        email=email, profiles=[profile["profile"] for profile in profiles]
    )
