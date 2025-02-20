type SessionId = string & { readonly brand: unique symbol }

type AuthenticationError = import("./errors").AuthenticationError

type IdentityPassword = string & { readonly brand: unique symbol }

type KratosUserId = string & { readonly brand: unique symbol }
type SessionToken = string & { readonly brand: unique symbol }

type IdentityPhone = {
  id: KratosUserId
  phone: PhoneNumber
}

type Session = {
  identity: IdentityPhone // | IdentityEmail // TODO
  id: SessionId
}

type WithSessionResponse = {
  sessionToken: SessionToken
  kratosUserId: KratosUserId
}

type LoginWithPhoneNoPasswordSchemaResponse = WithSessionResponse
type CreateKratosUserForPhoneNoPasswordSchemaResponse = WithSessionResponse

interface IAuthWithPhonePasswordlessService {
  login(
    phone: PhoneNumber,
  ): Promise<LoginWithPhoneNoPasswordSchemaResponse | AuthenticationError>
  createWithSession(
    phone: PhoneNumber,
  ): Promise<CreateKratosUserForPhoneNoPasswordSchemaResponse | AuthenticationError>
  createNoSession(phone: PhoneNumber): Promise<KratosUserId | AuthenticationError>
  upgradeToPhoneWithPasswordSchema(input: {
    kratosUserId: KratosUserId
    password: IdentityPassword
  }): Promise<IdentityPhone | AuthenticationError> // TODO: should be IdentityPhoneWithPassword
}
