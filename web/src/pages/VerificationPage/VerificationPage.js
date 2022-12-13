import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const VerificationPage = () => {
  return (
    <>
      <MetaTags title="Verification" description="Verification page" />

      <h1>VerificationPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/VerificationPage/VerificationPage.js</code>
      </p>
      <p>
        My default route is named <code>verification</code>, link to me with `
        <Link to={routes.verification()}>Verification</Link>`
      </p>
    </>
  )
}

export default VerificationPage
