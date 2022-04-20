variables = [
  "Volume de Negócios"
]

variables.each do |var|
  Variable.create(name: var, value: 0, icon:"")
end
