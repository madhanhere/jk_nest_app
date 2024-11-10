resource "aws_ecr_repository" "ecr_repo" {
    name = "nestapprepo"
}

output "repository_url" {
  value = aws_ecr_repository.ecr_repo.repository_url
}