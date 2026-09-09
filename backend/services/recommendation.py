from models.mandi import MandiOption


def rank_mandi_options(
    options: list[MandiOption],
) -> list[MandiOption]:
    """
    Rank mandi options by net revenue in descending order.

    Net revenue = gross revenue - transport cost.
    """

    return sorted(
        options,
        key=lambda option: option.net_revenue,
        reverse=True,
    )


def get_best_mandi(
    options: list[MandiOption],
) -> MandiOption | None:
    """
    Return the mandi option providing the highest net revenue.

    Returns None when no options are available.
    """

    if not options:
        return None

    return max(
        options,
        key=lambda option: option.net_revenue,
    )