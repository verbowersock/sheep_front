import gql from "graphql-tag";

export const ALL_SHEEP = gql`
  query getAllSheep {
    get_all_sheep {
      sheep_id
      picture
      tag_id
      scrapie_id
      name
      weight_at_birth
      dob
      sex
      purchase_date
      father {
        sheep_id
        tag_id
        name
      }
      mother {
        sheep_id
        tag_id
        name
      }
      breed {
        id
        breed_name
      }
      date_last_bred
      date_deceased
      color {
        id
        color_name
      }
      marking {
        id
        marking_name
      }
    }
  }
`;
export const ALL_BREEDS = gql`
  query getAllBreeds {
    get_all_breeds {
      breed_name
      id
    }
  }
`;

export const CREATE_BREED = gql`
  mutation Mutation($breedName: String!) {
    createBreed(breed_name: $breedName) {
      id
      breed_name
    }
  }
`;

export const DELETE_BREED = gql`
  mutation deleteBreed($deleteBreedId: Int!) {
    deleteBreed(id: $deleteBreedId)
  }
`;

export const ALL_MALES = gql`
  query getAllMales {
    get_all_males {
      tag_id
      name
      sheep_id
    }
  }
`;

export const ALL_FEMALES = gql`
  query getAllFemales {
    get_all_females {
      tag_id
      name
      sheep_id
    }
  }
`;

export const ALL_COLORS = gql`
  query getAllColors {
    get_all_colors {
      id
      color_name
    }
  }
`;

export const CREATE_COLOR = gql`
  mutation createColor($colorName: String!) {
    createColor(color_name: $colorName) {
      id
      color_name
    }
  }
`;

export const DELETE_COLOR = gql`
  mutation Mutation($deleteColorId: Int!) {
    deleteColor(id: $deleteColorId)
  }
`;

export const ALL_MARKINGS = gql`
  query getAllMarkings {
    get_all_markings {
      id
      marking_name
    }
  }
`;

export const CREATE_MARKING = gql`
  mutation createMarking($markingName: String!) {
    createMarking(marking_name: $markingName) {
      id
      marking_name
    }
  }
`;

export const DELETE_MARKING = gql`
  mutation deleteMarking($deleteMarkingId: Int!) {
    deleteMarking(id: $deleteMarkingId)
  }
`;

export const DELETE_SHEEP = gql`
  mutation deleteSheep($sheepId: Int!) {
    deleteSheep(sheep_id: $sheepId)
  }
`;

export const CREATE_SHEEP = gql`
  mutation CreateSheep(
    $picture: String
    $tagId: String!
    $dob: String
    $sex: String!
    $breedId: Int!
    $name: String
    $purchaseDate: String
    $dam: Int
    $sire: Int
    $colorId: Int
    $markingId: Int
    $scrapieId: String
  ) {
    createSheep(
      picture: $picture
      tag_id: $tagId
      dob: $dob
      sex: $sex
      breed_id: $breedId
      name: $name
      purchase_date: $purchaseDate
      dam: $dam
      sire: $sire
      color_id: $colorId
      marking_id: $markingId
      scrapie_id: $scrapieId
    ) {
      picture
      sheep_id
      tag_id
      scrapie_id
      name
      weight_at_birth
      sex
      dob
      purchase_date
      father {
        sheep_id
        tag_id
        name
      }
      mother {
        sheep_id
        tag_id
        name
      }
      breed {
        id
        breed_name
      }
      color {
        id
        color_name
      }
      marking {
        id
        marking_name
      }
    }
  }
`;

export const UPDATE_SHEEP = gql`
  mutation updateSheep(
    $sheepId: Int!
    $tagId: String
    $dob: String
    $sex: String
    $purchaseDate: String
    $breedId: Int
    $dam: Int
    $sire: Int
    $colorId: Int
    $markingId: Int
    $scrapieId: String
    $name: String
    $weightAtBirth: Int
    $dateDeceased: String
    $dateLastBred: String
    $picture: String
  ) {
    updateSheep(
      sheep_id: $sheepId
      tag_id: $tagId
      dob: $dob
      sex: $sex
      purchase_date: $purchaseDate
      breed_id: $breedId
      dam: $dam
      sire: $sire
      color_id: $colorId
      marking_id: $markingId
      scrapie_id: $scrapieId
      name: $name
      weight_at_birth: $weightAtBirth
      date_deceased: $dateDeceased
      picture: $picture
      date_last_bred: $dateLastBred
    ) {
      sheep_id
      picture
      tag_id
      scrapie_id
      name
      weight_at_birth
      date_deceased
      dob
      sex
      purchase_date
      father {
        sheep_id
        tag_id
        name
      }
      mother {
        sheep_id
        tag_id
        name
      }
      breed {
        id
        breed_name
      }
      color {
        id
        color_name
      }
      marking {
        id
        marking_name
      }
      date_last_bred
    }
  }
`;
