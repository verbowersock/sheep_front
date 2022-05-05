import gql from "graphql-tag";

export const ALL_SHEEP = gql`
  query getAllSheep {
    get_all_sheep {
      sheep_id
      tag_id
      scrapie_id
      name
      weight_at_birth
      dob
      sex
      purchase_date
      father {
        name
      }
      mother {
        name
      }
      breed {
        breed_name
      }
      date_last_bred
      date_deceased
    }
  }
`;
