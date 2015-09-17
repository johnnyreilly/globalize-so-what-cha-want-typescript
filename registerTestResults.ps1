write-host "Present working directory: $($pwd)"

$thereAreResults = test-path ./test-results
if ($thereAreResults -eq $FALSE) {
  write-host "Failing build as there are no test results"
  $host.SetShouldExit(1)
}

$testsuites = [xml](get-content .\test-results\*.xml)
$anyFailures = $FALSE

if ($testsuites) {

    foreach ($testsuite in $testsuites.testsuite) {

        write-host " $($testsuite.name)"

        foreach ($testcase in $testsuite.testcase){
            $failed = $testcase.failure
            $time = [decimal]$testcase.time * 1000 # from seconds to milliseconds
            $testName = "$($testcase.classname) $($testcase.name)"

            if ($failed) {
                write-host "Failed $($testcase.name) $($testcase.failure.message) in $($time) ms"
                Add-AppveyorTest $testName -Outcome Failed -FileName $testsuite.name -ErrorMessage $testcase.failure.message -Duration $time
                $anyFailures = $TRUE
            }
            else {
                write-host "Passed $($testcase.name) in $($time) ms"
                Add-AppveyorTest $testName -Outcome Passed -FileName $testsuite.name -Duration $time
            }
        }
    }
}
else {
    $anyFailues = $TRUE # no test results is a failure
}

if ($anyFailures -eq $TRUE){
    write-host "Failing build as there are broken tests"
    $host.SetShouldExit(1)
}
