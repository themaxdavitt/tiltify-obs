// Incomplete, see reference page here: https://tiltify.github.io/api/endpoints/campaigns-id-donations.html
type DonationsResponse = {
    data: Array<{
        id: number,
        amount: number,
        name: string,
        comment: string,
        completedAt: number,
        updatedAt: number,
        sustained: boolean
    }>
};

export function template(response: DonationsResponse): string {
    return response.data.map(({ name, amount }) => `${name} $${amount.toFixed(2)}`).concat(
        'Want to see your name down here? Donate to help fund the building of a "GO Kart" for Akron Children\'s Hospital! ' +
        '"GO Karts" are video game kiosks produced by the Gamers Outreach Foundation to help kids cope with treatment inside hospitals.'
    ).join(' - ');
}
