import { gql } from "@apollo/client";

export const SITE_NAME_QUERY = (siteName) => gql`
{
  launches(find: {site_name: "${siteName}"}) {
    launch_year
    launch_success
  }
}
`;

export const ROCKET_TYPE_QUERY = (siteName) => gql`
{
  launches(find: {site_name: "${siteName}"}) {
    rocket {
      rocket_type
    }
    launch_success
  }
}
`;

export const LAUNCHES_QUERY = gql`
  {
    launches {
      launch_success
      launch_site {
        site_name
      }
    }
  }
`;
