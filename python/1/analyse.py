#!/usr/bin/env python3
import re
import sys

PREFIX = r"^(?P<date>[a-zA-Z]{3} \d{2} \d{2}:\d{2}:\d{2}) (?P<hostname>[^ ]+) "

stop = None
for line in sys.stdin:
    m = re.search(PREFIX + r"exiting on signal (?P<signal>\d+)$", line)
    if m:
        stop = m
        print(f"System {m.group('hostname')} stopped cleanly at {m.group('date')}")
    else:
        m = re.search(PREFIX + "syslogd [^ ]+ (?P<reason>[^ ]+)", line)
        if m:
            print(f"System {m.group('hostname')} started at {m.group('date')}")
            if stop:
                print(f"\tPreviously stopped at {stop.group('date')} with signal {stop.group('signal')}, reason: {m.group('reason')}")
            else:
                print(f"\tNo clean shutdown found, system probably crashed or lost power")
            stop = None
