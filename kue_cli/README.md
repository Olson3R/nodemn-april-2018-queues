This is a simple CLI example that shows how to produce jobs and then consume the jobs using [Kue](https://github.com/Automattic/kue).

# Job Queue
- [Kue](https://github.com/Automattic/kue) is a priority job queue backed by redis, built for node.js.

# Installation

1. Clone or download the repo `git clone git@github.com:Olson3R/nodemn-april-2018-queues.git`
2. Change directories to the `nodemn-april-2018-queues/kue_cli` directory
3. Install the dependencies with yarn `./scripts/yarn-1.5.1.js install`

# Usage
- `./kue_cli.js produce <type> [-n <number>]` - Produce a job of type _type_. Optionally enqueue _number_ of jobs. Default is 1.
- `./kue_cli.js consume <name> <type>` - Consume jobs of type _type_. Can be a comma delimited list. The _name_ is just to distinguish multiple consumers.
