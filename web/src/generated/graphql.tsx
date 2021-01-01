import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  fetchNotes: Array<Note>;
  fetchNote?: Maybe<Note>;
  currentUser?: Maybe<User>;
  fetchUsers: Array<User>;
};


export type QueryFetchNoteArgs = {
  id: Scalars['Float'];
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Note;
  updateNote: Note;
  deleteNote: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
};


export type MutationCreateNoteArgs = {
  title: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteNoteArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: FullUserInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  error: Scalars['String'];
};

export type FullUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type BaseUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type FieldErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'error'>
);

export type FullUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'createdAt' | 'updatedAt'>
);

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & FieldErrorFragment
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  options: FullUserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & FieldErrorFragment
    )>> }
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
  username
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment FieldError on FieldError {
  field
  error
}
    `;
export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  username
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    user {
      ...BaseUser
    }
    errors {
      ...FieldError
    }
  }
}
    ${BaseUserFragmentDoc}
${FieldErrorFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: FullUserInput!) {
  register(options: $options) {
    user {
      ...BaseUser
    }
    errors {
      ...FieldError
    }
  }
}
    ${BaseUserFragmentDoc}
${FieldErrorFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};