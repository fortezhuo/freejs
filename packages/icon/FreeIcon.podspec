require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|

  s.name           = "FreeIcon"
  s.version        = package["version"]
  s.summary        = package["description"]
  s.author         = "Forte"
  s.license        = "MIT"
  s.homepage       = "https://github.com/fortezhuo"
  s.platforms      = { :ios => "9.0", :tvos => "9.0" }
  s.source         = { :git => "https://github.com/fortezhuo/freejs.git", :tag => "v#{s.version}" }
  s.resources      = "fonts/*.woff"
  s.preserve_paths = "**/*.{js,json}"
  s.dependency 'React'

end