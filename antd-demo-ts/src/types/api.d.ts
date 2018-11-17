/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Viewer
// ====================================================

export interface Viewer_viewer {
  __typename: "User";
  id: string;
  /**
   * The user's public profile name.
   */
  name: string | null;
}

export interface Viewer {
  /**
   * The currently authenticated user.
   */
  viewer: Viewer_viewer;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSimple
// ====================================================

export interface UserSimple {
  __typename: "User";
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any;
  /**
   * The user's public profile company.
   */
  company: string | null;
  /**
   * The user's publicly visible profile email.
   */
  email: string;
  id: string;
  /**
   * The user's public profile location.
   */
  location: string | null;
  /**
   * The username used to login.
   */
  login: string;
  /**
   * The user's public profile name.
   */
  name: string | null;
  /**
   * The HTTP URL for this user
   */
  url: any;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
