import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const VerificationResetPage = () => {
  return (
    <>
      <MetaTags
        title="VerificationReset"
        description="VerificationReset page"
      />

      <h1>VerificationResetPage</h1>
      <p>
        Find me in{' '}
        <code>
          ./web/src/pages/VerificationResetPage/VerificationResetPage.js
        </code>
      </p>
      <p>
        My default route is named <code>verificationReset</code>, link to me
        with `<Link to={routes.verificationReset()}>VerificationReset</Link>`
      </p>
    </>
  )
}

export default VerificationResetPage
