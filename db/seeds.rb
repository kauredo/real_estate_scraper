variables = [
  "volume de negócios"
]

variables.each do |var|
  Variable.create(name: var, value: 0)
end
