import {
  createFragmentContainer,
  graphql
} from 'react-relay'

import ProfileInviteFriend from 'js/components/Settings/Profile/ProfileInviteFriendComponent'

export default createFragmentContainer(ProfileInviteFriend, {
  app: graphql`
    fragment ProfileInviteFriendContainer_app on App {
      referralVcReward
    }
  `,
  user: graphql`
    fragment ProfileInviteFriendContainer_user on User {
      numUsersRecruited
      ...InviteFriendContainer_user
    }
  `
})
