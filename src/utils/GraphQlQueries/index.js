import { gql } from "@apollo/client";

export const LAUNCH_SITE_QUERY = gql`
  query LaunchSite($launchSite: String) {
  launches(find: {site_name: $launchSite}) {
    launch_year
    launch_success
  }
}
`;

// export const ROCKET_TYPE_QUERY = (siteName) => gql`
// {
//   launches(find: {site_name: "${siteName}"}) {
//     rocket {
//       rocket_type
//     }
//     launch_success
//   }
// }
// `;

export const ROCKET_TYPE_QUERY = gql`
  query RocketType($launchSite: String){
  launches(find: {site_name: $launchSite}) {
    rocket {
      rocket_type
    }
    launch_success
  }
}
`;

export const LAUNCHES_QUERY = gql`
  query Launches {
    launches {
      launch_success
      launch_site {
        site_name
      }
    }
  }
`;
