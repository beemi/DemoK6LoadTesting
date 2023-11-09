export const getSpacxDetailsQuery = () => {
    return `query ExampleQuery {
  company {
    ceo
    coo
    name
    headquarters {
      address
      city
      state
    }
  }
  roadster {
    apoapsis_au
    name
    details
    earth_distance_km
    earth_distance_mi
    eccentricity
  }
}`
}
