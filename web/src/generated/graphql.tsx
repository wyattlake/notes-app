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
  registerUser: UserResponse;
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


export type MutationRegisterUserArgs = {
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

export type RegisterUserMutationVariables = Exact<{
  options: FullUserInput;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'createdAt' | 'updatedAt' | 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'error'>
    )>> }
  ) }
);


export const RegisterUserDocument = gql`
    mutation RegisterUser($options: FullUserInput!) {
  registerUser(options: $options) {
    user {
      username
      createdAt
      updatedAt
      id
    }
    errors {
      field
      error
    }
  }
}
    `;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};