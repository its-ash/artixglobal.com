LLM_URL ?= http://127.0.0.1:9694/v1
LLM_MODEL ?= router/auto
PROMPT = Analyze the staged git changes and generate a concise commit message. Output ONLY the commit message. Do not include quotes, markdown, explanation, or bullet points.

run:
	npm run dev

build:
	rm -rf docs
	npx nuxt generate
	cp -R .output/public docs
	touch docs/.nojekyll

deploy: build
	git checkout main
	git add -A
	msg="$$(git diff --cached --stat; git diff --cached -- . ':!docs' | head -c 60000)"; \
	res="$$(jq -n --arg m '$(LLM_MODEL)' --arg p '$(PROMPT)' --arg d "$$msg" '{model:$$m,messages:[{role:"system",content:$$p},{role:"user",content:$$d}]}' \
		| curl -sf -m 120 -H 'Content-Type: application/json' -d @- '$(LLM_URL)/chat/completions' \
		| jq -r '.choices[0].message.content // empty')"; \
	git commit -m "$${res:-Update site}"
	git push origin main

.PHONY: run build deploy
