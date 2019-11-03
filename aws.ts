import * as cdk from '@aws-cdk/core'
import * as ecr from '@aws-cdk/aws-ecr'
import * as iam from '@aws-cdk/aws-iam'
import * as pure from 'aws-cdk-pure'

const policy = (): iam.PolicyStatement => {
   const policy = new iam.PolicyStatement()
   policy.addPrincipals(new iam.ServicePrincipal('codebuild.amazonaws.com'))
   policy.addActions(
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability"
   )
   return policy
}

const Repository = (): ecr.RepositoryProps => ({
  repositoryName: process.env.REPO
})

const CodeBuildDocker = (): cdk.StackProps => ({ env: {} })

const app = new cdk.App()
pure.join(app,
  pure.iaac(cdk.Stack)(CodeBuildDocker)
    .effect(x =>
      pure.join(x, 
        pure.iaac(ecr.Repository)(Repository)
          .effect(y => y.addToResourcePolicy(policy()))
      )
    )
)
app.synth()
