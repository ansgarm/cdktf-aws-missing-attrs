import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { CognitoUserPoolClient } from "@cdktf/provider-aws/lib/cognito-user-pool-client";
import { CognitoUserPool } from "@cdktf/provider-aws/lib/cognito-user-pool";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new AwsProvider(this, "aws");
    const pool = new CognitoUserPool(this, "pool", {
      name: "pool",
    });
    new CognitoUserPoolClient(this, "client", {
      explicitAuthFlows: ["ADMIN_NO_SRP_AUTH"],
      generateSecret: true,
      name: "client",
      userPoolId: pool.id,
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-aws-missing-attrs");
app.synth();
