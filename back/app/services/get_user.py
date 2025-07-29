from app.schemas.user import UserProfiles, Profile


def create_profile(profile_name: str, image: str) -> Profile:
    return Profile(profile_name=profile_name, image=image)


def create_user_profile_response(
    email: str, profiles: list[dict[str, str]]
) -> UserProfiles:
    return UserProfiles(
        email=email,
        profiles=[
            create_profile(profile["profile"], profile["image"]) for profile in profiles
        ],
    )
