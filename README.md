# .
# Project Setup and CI/CD Pipeline with GitLab and GitHub

This guide explains how to set up SSH keys, initialize the project with Git, and configure CI/CD pipelines for both GitLab and GitHub repositories. 

## 1. Setting Up SSH Keys for Multiple GitLab Accounts

### Step 1: Generate SSH Key for GitLab Account 1

```bash
ssh-keygen -t rsa -b 4096 -C "your-email-1@example.com" -f ~/.ssh/id_rsa_gitlab
```


To install dependencies:

```bash
bun install
```

To run:

```bash
bun run server.ts
```

This project was created using `bun init` in bun v1.1.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

This git repo is configured to push at both github and gitlab, by adding 2 remote origins. 

### Run the following command to check the current list of remote origins

```bash
git remote -v
```

### Run the following command to add more remote origins

```bash
git remote set-url --add origin <origin-name>
```

### Run the following command to push 

```bash
git push origin <branch-name>
```

## Steps for generating a ssh-key


