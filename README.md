# .
# Project Setup and CI/CD Pipeline with GitLab and GitHub

This guide explains how to set up SSH keys, initialize the project with Git, and configure CI/CD pipelines for both GitLab and GitHub repositories. 


# PART-1: Setting Up Multiple SSH Keys for Multiple Platforms (GitHub, GitLab, etc.)

This section explains how to configure your system to handle multiple SSH keys, which can be useful when working with multiple Git hosting platforms like GitHub and GitLab.

## 1. Generate SSH Keys for Multiple Accounts

### 1.1 Generating SSH Key for GitHub

To generate a new SSH key for GitHub, run the following command, replacing `<your-github-email>` with your GitHub email address:

```bash
ssh-keygen -t ed25519 -C "<your-github-email>" -f ~/.ssh/id_ed25519_github
``` 
### 1.2 Generating SSH Key for GitLab

Similarly, generate a new SSH key for GitLab, replacing <your-gitlab-email> with your GitLab email address:

```bash
ssh-keygen -t ed25519 -C "<your-gitlab-email>" -f ~/.ssh/id_ed25519_gitlab
```

Each key will be stored in the path you specify (~/.ssh/id_ed25519_github and ~/.ssh/id_ed25519_gitlab).

## 2. Add SSH Keys to the SSH Agent

Once you’ve generated the SSH keys, you need to add them to the SSH agent, which manages your keys during your Git sessions.

### 2.1 Start the SSH Agent

Run the following command to ensure the SSH agent is running:

```bash
eval "$(ssh-agent -s)"
```
 ### 2.2 Add SSH Keys to the Agent

Add both the GitHub and GitLab keys to the SSH agent using the ssh-add command:

```bash
ssh-add ~/.ssh/id_ed25519_github
ssh-add ~/.ssh/id_ed25519_gitlab
```

## 3. Configure SSH for Multiple Accounts

In this step, we will configure the SSH client to know which key to use for which platform. This is done by creating or updating the ~/.ssh/config file.

### 3.1 Edit the ~/.ssh/config File

Add the following configuration to the ~/.ssh/config file to specify the SSH keys for GitHub and GitLab:

```bash
# GitHub configuration
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github

# GitLab configuration
Host gitlab.com
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/id_ed25519_gitlab
```

This setup tells your SSH client to use the correct SSH key when interacting with GitHub or GitLab.

## 4. Add SSH Keys to GitHub and GitLab

### 4.1 GitHub

Copy the contents of the GitHub public key to your clipboard:

```bash
cat ~/.ssh/id_ed25519_github.pub
```

Go to GitHub → Settings → SSH and GPG keys → New SSH key, and paste the key.

### 4.2 GitLab

Copy the contents of the GitLab public key to your clipboard:

```bash
cat ~/.ssh/id_ed25519_gitlab.pub
```
Go to GitLab → Profile Settings → SSH Keys, and paste the key.

## 5. Verify SSH Setup

### Github and Gitlab

To test the connection with GitHub:

```bash
ssh -T git@github.com
ssh -T git@gitlab.com
```

If everything is set up correctly, you should see a message confirming that you've successfully authenticated, but that GitHub/GitLab does not provide shell access.

# PART-2: Setting up ssh-key for multiple accounts for the same platform (ex- gitlab in this case)

### 1. Keygen ->

```bash
ssh-keygen -t rsa -b 4096 -C "your_second_gitlab_email@example.com"
```

Save this key as ```id_rsa_gitlab_second```

### 2. Adding the key to the ssh-agent

start the agent

```bash
eval "$(ssh-agent -s)"
```
add the keys

```bash
ssh-add ~/.ssh/id_ed25519_github
ssh-add ~/.ssh/id_rsa_gitlab
ssh-add ~/.ssh/id_rsa_gitlab_second
```

### 3. Configure the ssh-config

To manage multiple SSH keys, edit the SSH config file located at ~/.ssh/config:

```bash
nano ~/.ssh/config
```

Add the following configuration:

```bash
# GitHub Account
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519_github

# First GitLab Account
Host gitlab.com-first
  HostName gitlab.com
  User git
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa_gitlab

# Second GitLab Account
Host gitlab.com-second
  HostName gitlab.com
  User git
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa_gitlab_second
```
### 4. Add the public key to the respective platforms

### 5. Verify the connection

```bash
ssh -T git@github.com
ssh -T git@gitlab.com-first
ssh -T git@gitlab.com-second
```
### 6. Add remote origins to your local repo

```bash
git init --initial-branch=main

git remote add origin git@github.com:your-username/your-repo.git

git remote set-url --add origin git@gitlab.com-first:your-gitlab-username/your-repo.git

git remote set-url --add origin git@gitlab.com-second:your-second-gitlab-username/your-repo.git

```

### 7. Push to multiple repos

Use the following command to push to both remotes:

```bash
git push origin main
```

You can also push to a specific remote if needed:

```bash
git push origin main --set-upstream-to git@github.com:your-username/your-repo.git
```

To check your remotes:

```bash
git remote -v
```

Note: This git repo is configured to push at both github and gitlab, by adding 2 remote origins. 

Note: For personal reference:

#### Run the following command to check the current list of remote origins

```bash
git remote -v
```

#### Run the following command to add more remote origins

```bash
git remote set-url --add origin <origin-name>
```

#### Run the following command to push 

```bash
git push origin <branch-name>
```

### Steps for generating a ssh-key



